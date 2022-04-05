const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config(); //환경변수에 설정 -> COOKIE_SECRET 비밀키 설정
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); //서버에 클라이언트에서 어떤 요청이 왔는지 알수있음//http메서드,응답코드,응답시간,응답용량 //dev말고 combined도 있음 ->더 자세한 정보 
app.use('/', express.static(path.join(__dirname, 'public'))); //static 미들웨어 ->정적파일 보내줌 (요청경로,실제경로) //정적파일을보내주고 여기서 끝남 다음미들웨어로 넘어가지x//만약 없다면 next호출
//최근에 body-parser가 express에 내장되어있음 -> express.json(),express.urlencoded({ extended: false })
app.use(express.json());//알아서 요청데이터가 파싱되서 req.body.name 이런식으로 바로 사용이 가능함
app.use(express.urlencoded({ extended: false }));//클라이언트에서 form submit할때 url encoded이기때문에 form을 파싱해줌 //extended:true 쿼리스트링처리->qs 모듈//false면 querystring
app.use(cookieParser(process.env.COOKIE_SECRET));//쿠키를 파싱해주는 미들웨어(문자열->객체)
app.use(session({ //요청마다 개인의 세션설정
  resave: false, //요청이 왔을때 세션에 수정사항이 생기지 않아도 다시 저장할지 여부
  saveUninitialized: false,//세션에 저장할 내역이 없더라도 세션을 저장할지 여부 
  secret: process.env.COOKIE_SECRET,//cookie value->암호화해서 보내줌
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie', //cookie name
}));
//req.session.save (수동저장,쓸일거의 x)


//body-parser또는 express.json,urlencoded 으로 form 본문을 해석할수있음
//근데 form태그의 enctype이 multipart/form-data 즉 파일형식(이미지,파일,영상)일때는 multer를 사용해야됨
const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');//서버시작전 uploads폴더를 읽고
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');//없으면 uploads폴더 생성
}
const upload = multer({ //multer 호출 (크게 storage,limits 주 옵션)
  storage: multer.diskStorage({//업로드한 파일 저장경로(diskStorage,하드디스크,메모리,s3,구글cloud등등에저장) 여기선 multer안diskStorage에 저장
    destination(req, file, done) {
      done(null, 'uploads/'); 
    },
    filename(req, file, done) {//파일명
      const ext = path.extname(file.originalname);//확장자 추출
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);//파일이름+날짜+확장자 //done(에러처리미들웨어 , 성공할떄 값)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },//파일용량(n*mb)//파일갯수 등등도 있음//
});

app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => { //업로드라는 미들웨어를 router에 장착함(특정 router에만 발생하므로)->single:한개의 파일만 업로드할때 
  console.log(req.file);//업로드한 파일은 req.file에 저장    //따른미들웨어도 특정 라우터에만 적용한다면 이런식으로 해도됨
  res.send('ok');                                           //여기서 image는 form태그의 input 태그(type=file)의 name이랑 일치해야됨
});                                                         //formData는  파일과 데이터를 동시에 전송이 가능->그떄는 upload.array로 사용 
                                                            //데이터를 받을때는 req.body
                                                            //만약 input file태그 multiple이면  req.files 로 받음
                                                            //만약 input file태그가 여러개이면 upload.fileds 사용
app.get('/', (req, res, next) => {
  console.log('GET / 요청에서만 실행됩니다.');
  //req.cookies//{mycookie:'test'}
  //req.signedCookies //암호화된 쿠키
  res.cookie('name',encodeURIComponent(name),{ //set cookie
    expires:new Data(),
    httpOnly:true,
    path:'/'
  })
  res.clearCookie('name',encodeURIComponent(name),{ //clear cookie
    httpOnly:true,
    path:'/'
  })

  next();
}, (req, res) => {
  throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});


// app.use('/',(req,res,next)=>{ //로그인한사람만 정적파일 보여주고싶다면 (미들웨어 확장)
//   if (req.session.id){
//     express.static(path.join(__dirname, 'public'))(req,res,next)
//   }
//   else{
//     next()
//   }
// })
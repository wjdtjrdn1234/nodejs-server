const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');


dotenv.config();
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev')); //서버에 클라이언트에서 어떤 요청이 왔는지 알수있음//http메서드,응답코드,응답시간,응답용량 //dev말고 combined도 있음 ->더 자세한 정보 
app.use('/', express.static(path.join(__dirname, 'public')));
//최근에 body-parser가 express에 내장되어있음 -> express.json(),express.urlencoded({ extended: false })
app.use(express.json());//알아서 요청데이터가 파싱되서 req.body.name 이런식으로 바로 사용이 가능함
app.use(express.urlencoded({ extended: false }));//클라이언트에서 form submit할때 url encoded이기때문에 form을 파싱해줌 //extended:true 쿼리스트링처리->qs 모듈//false면 querystring
app.use(cookieParser(process.env.COOKIE_SECRET));//쿠키를 파싱해주는 미들웨어(문자열->객체)
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
  },
  name: 'session-cookie',
}));

const multer = require('multer');
const fs = require('fs');

try {
  fs.readdirSync('uploads');
} catch (error) {
  console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
  fs.mkdirSync('uploads');
}
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, 'uploads/');
    },
    filename(req, file, done) {
      const ext = path.extname(file.originalname);
      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});
app.get('/upload', (req, res) => {
  res.sendFile(path.join(__dirname, 'multipart.html'));
});
app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.send('ok');
});

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

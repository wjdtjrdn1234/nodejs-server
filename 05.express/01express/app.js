const express = require('express'); //node_modeules에서 express 열어서 보면 http서버를 쓰고있음
const path = require('path');  //경로처리

const app = express();
app.set('port', process.env.PORT || 3000); //port라는 속성에 process.env.PORT || 3000 삽입 //만약 포트를 바꾸고 싶으면 터미널에 SET PORT=80 입력

app.listen(app.get('port'), () => { //express server 실행 //app.get('port'):3000
  console.log(app.get('port'), '번 포트에서 대기 중');
});


app.use((req,res,next)=>{ //미들웨어: 라우터의 공통적인 코드 실행//app use자체가 미들웨어가 아니라 app use에 미들웨어를 장착한것 
  console.log('모든 요청에 실행')//만약 about에서만 실행하고 싶으면 app.use('/about',()=>{}) 실행된담에 app.get('/about')으로 이동 
  next(); //next를 실행해야 다음 router중에 일치하는부분을 실행
})// },(req,res,next)=>{
//   throw new Error('에러 발생')
// })

app.get('/', (req, res) => { //전에처럼 path를 if문으로 도배를 하지 않아도 됨 // roter설정안해놓은곳은 알아서 404에러를 띄워줌 // 서버쪽에러는 500에러를 띄워줌
  res.sendFile(path.join(__dirname, '/index.html')); //현재폴더의 html파일 보내주기 //한 라우터에 send,json,sendFile,wrtieHead 같이쓰면 에러발생 //응답은 1번만
});


app.get('/about', (req, res) => {
  // res.writeHead(200,{'Content-Type': 'application/json'})
  // res.end(JSON.stringify({name:'seok'}))
  res.json({name:'seok'}); //res.json은 위에 두줄을 줄여놓은것
});

app.get('/category/:name', (req, res) => { // (라우트 매개변수)/:name -> req.params , /user/123?limit=5&skip=10 ->req.query {limit:'5',skip:'10'} , /* : wild card 
  // res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
  // res.end(`Hello, ${req.params.name}`)
  res.send(`Hello, ${req.params.name}`);//send가 http서버에서 whiteHead+end를 줄여놓은거
});

// app.get('*', (req, res) => { //get요청 어떤주소든지 처리 (맨위에있으면 안됨x , 웬만해선 아래로) 
//   res.send(`Hello, ${req.params.name}`);
// });

app.use((req,res,next)=>{  //404미들웨어 ->이건 에러처리로 안들어감 
  //res.status(404).send('404 발생') //원래 기본적으로 응답코드는 200임 (성공) send할떄 생략된거일뿐
  res.status(200).send('404 발생') 
})

//에러처리
app.use((err,req,res,next)=>{ //에러 미들웨어는 반드시 next를 써야됨 //라우터는 생략가능
  // res.status(500).send('에러발생') //응답코드를 이렇게 적어주면 해커가 의도적으로 서버를 집중적으로 공격을 할 수 있음 //보안적으로 안전할때만 사용하는게 좋음
  res.status(200).send('에러발생')
  console.log(err) //보안상 서버에서만 에러메시지 출력
})

//웹서버를 만들면 res.sendFile를 많이 쓰고
//api 서버를 만들면 res.json을 많이 씀


// app.use((req,res,next)=>{ 
//   console.log('모든 요청에 실행')/
//   next(); 
// },(req,res,next)=>{
//   throw new Error('에러 발생')
// }) 

// app.use((req,res,next)=>{  실무에서는 위에처럼 대놓고 에러발생하는거보다 이렇게 많이발생함 ->에러전달은 next로 ->에러처리 미들웨어로 전달
//   console.log('모든 요청에 실행')/
//   next(); 
// },(req,res,next)=>{
//   try{
//    에러발생코드
//   }catch(err){
//     next(err)
//   }
// }) 
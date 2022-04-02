const express = require('express'); //node_modeules에서 express 열어서 보면 http서버를 쓰고있음
const path = require('path');  //경로처리

const app = express();
app.set('port', process.env.PORT || 3000); //port라는 속성에 process.env.PORT || 3000 삽입 //만약 포트를 바꾸고 싶으면 터미널에 SET PORT=80 입력

app.get('/', (req, res) => { //전에처럼 path를 if문으로 도배를 하지 않아도 됨 // roter설정안해놓은곳은 알아서 404에러를 띄워줌 // 서버쪽에러는 500에러를 띄워줌
  // res.send('Hello, Express');
  res.sendFile(path.join(__dirname, '/index.html')); //현재폴더의 html파일 보내주기
});

app.listen(app.get('port'), () => { //express server 실행 //app.get('port'):3000
  console.log(app.get('port'), '번 포트에서 대기 중');
});

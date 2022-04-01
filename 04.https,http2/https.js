const https = require('https');
const fs = require('fs');

https.createServer({
  cert: fs.readFileSync('도메인 인증서 경로'),
  key: fs.readFileSync('도메인 비밀키 경로'),
  ca: [
    fs.readFileSync('상위 인증서 경로'),
    fs.readFileSync('상위 인증서 경로'),
  ],
}, (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.write('<h1>Hello Node!</h1>');
  res.end('<p>Hello Server!</p>');
})
  .listen(443, () => {
    console.log('443번 포트에서 서버 대기 중입니다!');
  });
  
//웹 서버에 ssl 암호화를 추가하는 모듈
//오고가는 데이터를 암호화해서 중간에 다른사람이 요청을 가로채더라도 내용을 확인할 수 없음
//사이트정보보기 -> 자물쇠
//개발자 도구->네트워크->헤더에 들어가보면 너무 중요한 정보들이 적나라하게 들어나있다->데이터 탈취 가능성

//로그인할떄 서버쪽으로 이메일,비밀번호 같은게 개발자도구를 열면 나타난다 ->http 요청을 탈취하면 데이터를 알 수 있음 
//https를 적용하면 요청자체가 암호화되어있다
//https는 막적용 하는게 아니라 , 인증서를 인증기관에서 얻어와야함. 인증되면 인증기관이 cert,key,ca 파일을 준다.
//그 파일을 받으면 폴더에 저장하고 fs로 읽어주면 됨
//유명한 인증기관:letsencrypt
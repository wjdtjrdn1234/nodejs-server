const http = require("http");

http
  .createServer((req, res) => {
    console.log(req.url, req.headers.cookie);
    res.writeHead(200, { "Set-Cookie": "mycookie=test" });//writeHead:요청헤더에 입력하는 메서드 //set-cookie:브라우저에게 쿠키를 설정하라고 명령
    res.end("Hello Cookie");
  }).listen(8083, () => {
    console.log("8083번 포트에서 서버 대기 중입니다!");
  });

//요청에는 한가지 단점이 있다
//http는 기본적으로 stateless하므로 누가요청을 보냈는지 모름(ip정보,브라우저 정보정도만 암)
//로그인구현 -> 로그인을 구현할려면 쿠키와 세션이 필요(로그인기능일때만 필요하진x)

//쿠키:(키=값) 쌍
//매 요청마다 브라우저가 알아서 서버에 보냄
//우리가 할 일은 쿠키에 값을 저장하기만 하면됨
//쿠키는 기본에 헤더에 저장되서 이동됨  

//요청->쿠키를 저장해서 응답(응답헤더에 쿠키를저장) -> 쿠키와 함께 요청 -> 응답


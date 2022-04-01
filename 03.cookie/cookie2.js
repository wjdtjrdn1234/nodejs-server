const http = require("http");
const fs = require("fs").promises;
const url = require("url");
const qs = require("querystring");

const parseCookies = (
  cookie = "" //쿠키정보 문자열->객체
) =>
  cookie
    .split(";")
    .map((v) => v.split("="))
    .reduce((acc, [k, v]) => {
      acc[k.trim()] = decodeURIComponent(v);
      return acc;
    }, {});

http
  .createServer(async (req, res) => {
    const cookies = parseCookies(req.headers.cookie); // { mycookie: 'test' }

    // 주소가 /login으로 시작하는 경우
    if (req.url.startsWith("/login")) {
      const { query } = url.parse(req.url);
      const { name } = qs.parse(query); //query string 추출
      const expires = new Date();
      // 쿠키 유효 시간을 현재시간 + 5분으로 설정
      expires.setMinutes(expires.getMinutes() + 5);
      res.writeHead(302, { //301,302: redirection 이주소로 다시보내라
        Location: "/",
        "Set-Cookie": `name=${encodeURIComponent( //encodeURIComponent : cookie나 요청주소는 한글로 되있는게 위험할수 있으므로 encode해주는것
          name
        )}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`, //쿠키 만료기간설정 // 안설정하면 세션쿠키:브라우저가 닫힐떄까지 유지
      });                                                        //브라우저가 서버에 요청하면 만료된 쿠키를 안보내줌
      res.end();                                                  //HttpOnly:자바스크립트로 접근x (보안상)
      // name이라는 쿠키가 있는 경우                               //Path=/ : /아래에잇는 주소는 모두 쿠키가 유효
    } else if (cookies.name) {
      res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(`${cookies.name}님 안녕하세요`);
    } else { 
      try {
        const data = await fs.readFile("./cookie2.html");
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(data);
      } catch (err) {
        res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
        res.end(err.message);
      }
    }
  })
  .listen(8084, () => {
    console.log("8084번 포트에서 서버 대기 중입니다!");
  });

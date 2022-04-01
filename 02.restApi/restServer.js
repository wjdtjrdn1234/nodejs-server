const http = require("http");
const fs = require("fs").promises;

const users = {}; // 데이터 저장용

http
  .createServer(async (req, res) => {
    try {
      if (req.method === "GET") {
        if (req.url === "/") {
          const data = await fs.readFile("./restFront.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" }); //200:응답 성공
          return res.end(data);
        } else if (req.url === "/about") {
          const data = await fs.readFile("./about.html");
          res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
          return res.end(data);
        } else if (req.url === "/users") {
          res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",//application/json , html이 아닌 json방식으로 보냄ㄴ
          });
          return res.end(JSON.stringify(users)); //체를 JSON 문자열로 변환  
        }
        // /도 /about도 /users도 아니면
        try {
          const data = await fs.readFile(`.${req.url}`); //예를들어 restFront.js //<script src="./restFront.js"></script> 클라이언트에서 get(restFront.js)요청
          return res.end(data);
        } catch (err) {
          // 주소에 해당하는 라우트를 못 찾았다는 404 Not Found error 발생
        }
      } else if (req.method === "POST") { 
        if (req.url === "/user") {
          let body = "";
          // 요청의 body의 data를 stream 형식으로 받음
          req.on("data", (data) => {
            body += data;
          });
          // 요청의 body를 다 받은 후 실행됨
          return req.on("end", () => {
            console.log("POST 본문(Body):", body);
            const { name } = JSON.parse(body);
            const id = Date.now();
            users[id] = name;
            res.writeHead(201, { "Content-Type": "text/plain; charset=utf-8" });//200은 단순한 성공 //201은 생성됨
            res.end("ok");
          });
        }
      } else if (req.method === "PUT") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          let body = "";
          req.on("data", (data) => {
            body += data;
          });
          return req.on("end", () => {
            console.log("PUT 본문(Body):", body);
            users[key] = JSON.parse(body).name;
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            return res.end("ok");
          });
        }
      } else if (req.method === "DELETE") {
        if (req.url.startsWith("/user/")) {
          const key = req.url.split("/")[2];
          delete users[key];
          res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
          return res.end("ok");
        }
      }
      res.writeHead(404); //요청에 대한 정보를 찾지 못했을때
      return res.end("NOT FOUND");
    } 
    catch (err) {
      console.error(err);
      res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
      res.end(err.message);
    }
  })
  .listen(8082, () => {
    console.log("8082번 포트에서 서버 대기 중입니다");
  });
//서버에 요청을 보낼때 주소를 통해 요청의 내용을 표현
// /index.html이면 index.html파일을 보내달라는 뜻
//근대 꼭 html js css image 같은 파일을 요구하지않아도 됨 -> 추상적인것을 요구해도됨 //예를들어 id=3인 유저정보

//이때 주소를 정해주는 규칙을 rest api를 많이씀
//rest api:서버의 자원을 정의하고 자원에 대한 주소를 지정하는 방법
//만약 /user이면 사용자 정보에 관한 정보를 요청하는것

//http protocol: 어떤 클라이언트와 서버에 상관없이 데이터를 통신하고자 하는 규약
//ios,안드로이드,웹 모두 같은주소로 요청 보낼 수 있음

//해당 자원에대한 접근하기위한 http 메서드들
//get:서버의 자원을 가져오라고할 때 사용
//post:서버에 자원을 등록하고자할 떄 사용(예를들어 로그인,어떤 유저에게 돈을 보내라)
//put:서버의 자원을 요청으로 보내는 자원으로 바꿀 때 사용(전체수정)
//patch:서버 자원의 일부만 수정하고자할 때 사용(부분수정)
//delete:서버 자원을 삭제하고자할 때 사용

//rest api대로 서버의 주소를 체계적으로 정리했다면 그 서버는 restful한 서버
//request,response header: 데이터들에 대한 데이터 예를들어 html파일을 보내주면 response.header에는 html파일에대한 정보를 헤더에 담음

//요청 데이터: request.payload, 응답 데이터: response

//http 응답코드 : https://developer.mozilla.org/ko/docs/Web/HTTP/Status
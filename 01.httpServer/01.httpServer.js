const http = require('http'); //http server 생성

const server = http.createServer((req,res)=>{ //실행한 서버로 요청이오면 해당함수가 실행됨 -> 해당함수에서 응답하거나 , 거부하거나
    res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})//응답받은 브라우저에서 해당 응답코드가 html 코드인지 문자열 코드인지 작성해줘야함//charset=utf-8'한글
    res.write('<h1>hello node</h1>') //html tag처럼 응답보내기
    res.write('<h1>hello server</h1>')
    res.end('<h1>bye</h1>')
}).listen(8080,()=>{ //서버도 프로그램이기떄문에 노드가 실행하기 위해 서버를 프로세스로 올리기 //8080 포트에 연결됬다면 해당 콜백함수 실행
    console.log('8080 서버 연결')
}) 
server.on('listening',()=>{
    console.log('8080 서버 연결') //위에있는 콜백을 여기로 뺄 수도 있음(대신 위에있는 콜백은 지워줘야함)
})
server.on('error',(error)=>{ //http서버안 코드가 에러발생시 에러처리
    console.log(error) 
})
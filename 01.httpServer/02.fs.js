const http = require('http'); //http server 생성
const fs = require('fs').promises //html을 일어주는 fs

const server = http.createServer(async(req,res)=>{  //html코드를 여기서 불러오는건 비효율적 , html파일을 따로만들어서 보내주기
    try{
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'})
        const data = await fs.readFile('./02.html')
        res.end(data)
    }
    catch(err){
        console.log(err)
        res.writeHead(200,{'Content-Type':'text/plain; charset=utf-8'}) //여기서 plain은 일반 문자열
        res.end(err.message)
    }
}).listen(8080) 

server.on('listening',()=>{
    console.log('8080 서버 연결') 
})
server.on('error',(error)=>{
    console.log(error) 
})
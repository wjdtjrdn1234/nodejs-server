console.log('req res method')
//req method
//req.app:req객체를 통해 app객체에 접근가능, req.app.get('port')와 다른식으로 사용가능
//req.body:body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체
//req.cookies:cookie-parser미들웨어가 만드는 요청의 쿠키를 해석한 객체
//req.ip 요청의 ip주소가 담겨짐
//req.params:라우트 매개변수에 대한 정보가 담긴 객체
//req.query:쿼리스트링에 대한 정보가 담긴 객체
//req.signedCookies:서명된 쿠키들은 req.cookies대신 여기에 담김
//req.get(헤더이름):헤더의값을 가져오고 싶을떄 사용하는 메서드

//res method
//res.app: req.app처럼 res객체를 통해 app객체에 접근가능
//res.cookie(키,값,옵션): 쿠키를 설정하는 메서드
//res.clearCookie(키,값,옵션): 쿠키를 제거하는 메서드
//res.end(): 데이터 없이 응답을 보냄
//res.json(JSON): json형식의 응답을 보냄
//res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보냄
//res.render(뷰,데이터): 템플릿엔진을 렌더링해서 응답할떄 사용
//res.send(데이터): 데이터와 함께 응답을 보냄,데이터는 문자열일 수도 있고, HTML일 수도 있으며, 객체나 배열일 수도 있음
//res.sendFile(경로): 경로에 위치한 파일을 응답
//res.set(헤더,값): 응답의 헤더를 설정
//res.status(코드): 응답시의 http상태코드 지정

//end~sendfile은 전체요청에 딱 1번써야됨

//res.status(200).cookie('test','test').redirect('/admin') : method chaining가능
const express = require('express');
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');

const { sequelize } = require('./models');
const indexRouter = require('./routes');
const usersRouter = require('./routes/users');
const commentsRouter = require('./routes/comments');

const app = express();
app.set('port', process.env.PORT || 3001);
app.set('view engine', 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});
sequelize.sync({ force: false })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err) => {
    console.error(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/comments', commentsRouter);

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기 중');
});

//sequelize란 sql작업을 쉽게 도와주는 라이브러리(자바스크립트로 데이터베이스 조작가능)
//자바스크립트 코드를 쓰면 sequelize가 알아서 sql로 바꿔서 실행해줌 (mysql외에도 다른 관계형db와도 호환됨)
//좀 복잡한 프로젝트에서는 한계가 있음

//npm i sequelize sequelize-cli mysql2

//sequelize: sequelize본체
//sequelize-cli: sequelize명령어 사용하게 해주는 패키지
//mysql2 : mysql db가 아닌 드라이버(node js와 mysql을 이어주는 역활)
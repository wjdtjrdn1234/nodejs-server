const express = require('express');

const router = express.Router();

// GET / 라우터
router.get('/', (req, res) => {
  res.send('Hello, Express');
});

module.exports = router;

//주소는 같지만 메서드가 다른코드 ->그룹화 가능
//rotuer.get('/abc',(req,res)=>{
//   res.send('GET/abc')
// })
// rotuer.post('/abc',(req,res)=>{
//   res.send('POST/abc')
// })

//router.route('/abc')
//.get('/abc',(req,res)=>{
//   res.send('GET/abc')
// })
//.post(req,res)=>{
//   res.send('POST/abc')
// })

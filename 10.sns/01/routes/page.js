const express = require('express');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', (req, res) => { //profile page render
  res.render('profile', { title: '내 정보 - sns' });
});

router.get('/join', (req, res) => {  //join page render
  res.render('join', { title: '회원가입 - sns' });
});

router.get('/', (req, res, next) => {
  const twits = [];  //main page render
  res.render('main', {
    title: 'sns',
    twits,
  });
});

module.exports = router;

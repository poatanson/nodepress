const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

// 라우터 & 미들웨어
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const postRoutes = require('./routes/posts');
const { isAuthenticated } = require('./middlewares/auth');

const app = express();

// Middleware 설정
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use(session({
    secret: 'my_secret_key',
    resave: false,
    saveUninitialized: false,
}));

// View 설정
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// DB 연결
mongoose.connect('mongodb://localhost:27017/crud_demo')
    .then(() => console.log('✅ MongoDB 연결됨'))
    .catch(err => console.error('❌ MongoDB 연결 오류:', err));

// 라우터 설정
app.use(authRoutes);
app.use('/users', isAuthenticated, userRoutes);
app.use('/posts', isAuthenticated, postRoutes);

// 루트 리다이렉트
app.get('/', (req, res) => {
    res.redirect('/login');
});

// 서버 실행
app.listen(3000, () => {
    console.log('🚀 서버 실행 중: http://localhost:3000');
});

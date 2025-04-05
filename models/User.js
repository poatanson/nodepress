const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String // 해시된 비밀번호 저장
});

module.exports = mongoose.model('User', userSchema);

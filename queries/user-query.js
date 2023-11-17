exports.insertUser = 'INSERT INTO user (email, nickname, password) VALUES (?, ?, ?)'
exports.nicknameExist = `SELECT nickname FROM user WHERE nickname=?`
exports.idExist = `SELECT email FROM user WHERE email=?`;

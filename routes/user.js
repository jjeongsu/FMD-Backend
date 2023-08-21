const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig);


router.get('/', (req, res) => {
  res.send('Hello, User');
});

router.post('/join', (req, res) => {
    var sql = 'INSERT INTO user (userIdx, email, nickname, password) VALUES (?, ?, ?, ?)';
    var params = []
    connection.query(``, (error, rows) => {
    });
});

router.get('/check-join-email/:user_email', (req, res) => {
    // console.log(req.params.user_email)
    connection.query(`SELECT email FROM user WHERE email="${req.params.user_email}"`, (error, rows) => {
        if(error) throw error;
        else{
            console.log(rows);
            if(rows.length == 0) {
                res.json(200, {
                    "isSuccess": true,
                    "code": 1000,
                    "message": "요청에 성공하였습니다.",
                    "result": {
                        "valid": true
                    }
                });
            } else { 
                res.json(200, {
                    "isSuccess": false,
                    "code": 1000,
                    "message": "요청에 성공하였습니다.",
                    "result": {
                        "valid": false
                    }
                })
            }
        }        
    })
});


router.get('/check-join-nickname/:nickname', (req, res) => {
    // console.log(req.params.user_email)
    connection.query(`SELECT nickname FROM user WHERE nickname="${req.params.nickname}"`, (error, rows) => {
        if(error) throw error;
        else{
            console.log(rows);
            if(rows.length == 0) {
                res.json(200, {
                    "isSuccess": true,
                    "code": 1000,
                    "message": "요청에 성공하였습니다.",
                    "result": {
                        "valid": true
                    }
                });
            } else { 
                res.json(200, {
                    "isSuccess": false,
                    "code": 1000,
                    "message": "요청에 성공하였습니다.",
                    "result": {
                        "valid": false
                    }
                })
            }
        }        
    })
});


module.exports = router;


/**
 * app.get('/db', (req, res) => {
    connection.query('SELECT * FROM user', (error, rows) => {
        if(error) throw error;
        console.log('User info is: ', rows);
        res.send(rows);
    });
})
 * 
 */
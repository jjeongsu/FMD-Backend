const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbconfig = require('../config/database');
const connection = mysql.createConnection(dbconfig);


router.get('/', (req, res) => {
  res.send('Hello, User');
});

function isExist(arg, type){
    var sql = '';
    var params = [arg];
    if(type === "nickname"){
        sql = `SELECT nickname FROM user WHERE nickname="${arg}"`;
    } else if(type === "email"){
        sql = `SELECT email FROM user WHERE email="${arg}"`;
    }
    return new Promise((resolve, reject) => {
        console.log(sql, params)
        connection.query(sql, (error, rows) => {
            if(error) reject(new Error(error))
            else{
                console.log(rows);
                if(rows.length == 0){
                    console.log("이건 없는 값이다")
                    resolve(true);
                }
                else{
                    resolve(false);
                }
            }
        })      
    })
}

router.post('/join', async (req, res) => {
    var sql = 'INSERT INTO user (userIdx, email, nickname, password) VALUES (?, ?, ?, ?)';
    var params = [0, req.body.email, req.body.nickname, req.body.password];
    // res.send("post 시도");
    console.log(req.body)
    if (await isExist(req.body.nickname, "nickname") && await isExist(req.body.email, "email")){
        //2중체크 (이메일, 닉네임)
        //userIdx 값 찾기
        connection.query('SELECT userIdx FROM user ORDER BY userIdx DESC LIMIT 1', (error, rows)=>{
            if(error) throw error
            else{
                params[0] = rows[0].userIdx+1;

                //회원가입 insert
                connection.query(sql, params, (error, rows) => {
                    if(error) throw error
                    res.json(200, {
                        "isSuccess": true,
                        "code": 1000,
                        "message": "성공",
                        "result": {			
	                        "userIdx" : params[0],
                        }
                    })
                });
            }
        })
    }else{
        res.json(200, {
            "isSuccess": false,
            "code": 1000,
            "message": "실패 - 이메일 및 닉네임 중복",
            "result": {			
                "userIdx" : null,
            }
        })
    }
});


router.get('/check-join-email/:user_email', async(req, res) => {
    // console.log(req.params.user_email)
    var exist = await isExist(req.params.user_email, "email");
    console.log(exist);
    if(exist){
        res.json(200, {
            "isSuccess": true,
            "code": 1000,
            "message": "요청에 성공하였습니다.",
            "result": {
                "valid": true
            }
        });
    }
    else{
        res.json(200, {
            "isSuccess": false,
            "code": 1000,
            "message": "요청에 성공하였습니다.",
            "result": {
                "valid": false
            }
        })
    }
});


router.get('/check-join-nickname/:nickname', async(req, res) => {
    // console.log(req.params.user_email)
    var exist = await isExist(req.params.nickname, "nickname");
    if(exist){
        res.json(200, {
            "isSuccess": true,
            "code": 1000,
            "message": "요청에 성공하였습니다.",
            "result": {
                "valid": true
            }
        });
    }
    else{
        res.json(200, {
            "isSuccess": false,
            "code": 1000,
            "message": "요청에 성공하였습니다.",
            "result": {
                "valid": false
            }
        })
    }
});


module.exports = router;
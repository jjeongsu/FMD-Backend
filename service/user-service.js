const { password } = require('../config/database');
const pool = require('../database/pool')
const userQuery = require('../queries/user-query')

exports.isExist = async (arg, type) => {
    let result = null;
    if(type === "nickname"){
        try {
            result = await pool.query(userQuery.nicknameExist, [arg])

        } catch (err) {
            console.log(err)
            throw Error(err)
        }
    } else if(type === "email"){
        try {
            result = await pool.query(userQuery.idExist, [arg])

        } catch (err) {
            console.log(err)
            throw Error(err)
        }
    }
    console.log(result[0])
    if(result[0].length == 0) {
        console.log("사용 가능합니다")
        return true
    }
    else{
        console.log("이미 존재합니다")
        return false
    }
}


exports.insertUser = async(email, nickname, password) => {
    let result = null
    try{
        result = await pool.query(userQuery.insertUser, [email, nickname, password])
        console.log(result[0])
        if(result[0].affectedRows === 1){
            return true
        }
        else{
            return false
        }
    } catch(err){
        console.log(err)   
        throw Error(err)
    }
}


//참고//
// exports.deleteComment = async (boardId, commentId) => {
//     let conn = await pool.getConnection()
//     try {
//         await conn.beginTransaction()

//         let del = await conn.query(BoardQuery.deleteComment, [commentId])
//         if (del[0].affectedRows == 1) {
//             let upd = await conn.query(BoardQuery.minusCommentCnt, [boardId])
//         }
//         await conn.commit()

//         return del[0]
//     } catch (err) {
//         conn.rollback()
//         console.log(err)
//         throw Error(err)
//     } finally {
//         conn.release()
//     }
// }


// exports.getBoard = async (boardId) => {
//     try {
//         let data = await pool.query(BoardQuery.getBoard, [boardId])
//         return data[0]
//     } catch (err) {
//         console.log(err)
//         throw Error(err)
//     }
// }
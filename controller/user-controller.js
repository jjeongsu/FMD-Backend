const userService = require('../service/user-service')
const bcryptService = require('../service/bcrypt-service')

exports.insertUser = async(req, res, next) => {
    console.log(req.body)
    let {email, password, nickname} = req.body;

    try {
        let emailExist = await userService.isExist(email, "email")
        let nicknameExist = await userService.isExist(nickname, "nickname")
        console.log(emailExist, nicknameExist)
        if(emailExist && nicknameExist) {
            let hashpw = await bcryptService.encrypt(password)
            console.log("hashpw: ", hashpw)
            let result = await userService.insertUser(email, nickname, hashpw)
            console.log(result)
            if(result) {
                return res.status(200).json({message:"성공"})
            }
            else{
                return res.status(400).json({message:"실패"})
            }
        } else{
            return res.status(400).json({message:"이메일 또는 닉네임 중복 실패"})
        }
    } catch(err) {
        return res.status(500).json(err)
    }
}



const pool = require('../database/pool')
/**
 * 로그인 시 비밀번호 확인 방법!! 아래 코드 참고!!
 * bcrypt-service를 불러온 다음에 그 안에 있는 함수인 decrypt 사용 
 * - 매개변수로는 password(지금 입력받은 비밀번호), hashpw(디비에서 꺼낸 비번)을 입력!!
 * 여기서 쿼리문으로 email으로 검색하고 email, password를 받아서 password를 비교하면 됩니다!
 * 만약에 일치한다면 decrypt에서는 true, 아니면 false를 리턴해요
 */
exports.login = async(req, res) => {
    console.log(req.body)
    let {email, password} = req.body;

    try{
        let result = await pool.query(`select email, password from user where email="${email}"`);
        console.log(result[0][0])
        let match = await bcryptService.decrypt(password, result[0][0].password)
        if(match){
            return res.status(200).json({message:"로그인 성공"})
        }else{
            return res.status(400).json({message:"아이디 또는 비밀번호를 잘못 입력"})
        }
    } catch(err){
        return res.status(500).json(err)
    }
}
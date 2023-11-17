const bcrypt = require('bcrypt')

const salt = 12

exports.encrypt = async(password) => {
    const hash = await bcrypt.hash(password, salt)
    return hash
}

exports.decrypt = async(password, hash) => {
    const match = await bcrypt.compare(password, hash)
    if(match){
        return true
    }
    else{
        return false
    }
}
const crypto = require('crypto');
function md5(data){
    // 以md5的格式创建一个哈希值
    let hash = crypto.createHash('md5');
    return hash.update(data).digest('hex');
}

let mima = md5('dandan')
console.log(mima)

exports.md5 = md5

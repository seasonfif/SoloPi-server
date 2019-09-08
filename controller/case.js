/*
* case获取与上传操作
* */
let fs = require('fs')
let path = require('path')
let sd = require('silly-datetime')
let formidable = require('formidable')

exports.uploadCaseToPath = (req, callback)=>{
    var form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = path.normalize(__dirname + '/../tempup')
    form.keepExtensions = true
    var file_list = []

    form.on('file', (field, file)=> {
        file_list.push([field, file])
    })

    form.parse(req, (err, fields, files)=>{
        // console.log(fields)
        if (err){
            callback("解析请求失败")
            return;
        }
        var folderName = 'default'
        console.log(fields.folderName)
        if (fields.folderName){
            folderName = fields.folderName
        }
        var ran = parseInt(Math.random() * 89999 + 10000)
        file_list.forEach((value, index, array)=>{
            // console.log(util.inspect({value: value, index: index}))
            var file = value[1]
            var file_name = file.name
            var ttt = sd.format(new Date(), 'YYYYMMDDHHmmss')
            var file_path = file.path
            var old_path = file_path
            var new_path = __dirname  + '/../uploads/' + folderName

            console.log(new_path)
            var new_file = new_path + '/' + file_name
            fs.stat(new_path, (err, stats)=>{
                if (err){
                    fs.mkdir(new_path, ()=>{
                        renameFile(old_path, new_file, callback)
                    })
                }else{
                    renameFile(old_path, new_file, callback)
                }
            })
        })
    })
}

function renameFile(from, to, callback) {
    fs.rename(from, to, (err)=>{
        if (err){
            callback('文件改名失败')
        }else{
            console.log('receive&rename success')
            callback('上传成功')
        }
    })
}
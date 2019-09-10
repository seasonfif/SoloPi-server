/*
* case获取与上传操作
* */
let fs = require('fs')
let path = require('path')
let sd = require('silly-datetime')
let formidable = require('formidable')
let caseManager = require('./case')
let projectManager = require('./project')

function findProjects(req, callback) {
    projectManager.finojects((projects)=>{
        callback(projects)
    })
}

function saveCase(req, callback) {
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = path.normalize(__dirname + '/../tempup')
    form.keepExtensions = true
    let file_list = []

    form.on('file', (field, file)=> {
        file_list.push([field, file])
    })

    form.parse(req, (err, fields, files)=>{
        // console.log(fields)
        if (err){
            callback("解析请求失败")
            return;
        }
        let folderName = 'default'
        console.log(fields.folderName)
        if (fields.folderName){
            folderName = fields.folderName
        }

        file_list.forEach((value, index, array)=>{
            // console.log(util.inspect({value: value, index: index}))
            let file = value[1]
            let file_name = file.name
            let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss')
            let old_path = file.path
            let new_path = path.normalize(__dirname  + '/../uploads/' + folderName)

            console.log(new_path)
            let new_file = new_path + '/' + file_name
            fs.stat(new_path, (err, stats)=>{
                if (err){
                    fs.mkdir(new_path, {recursive: true}, ()=>{
                        console.log("mkdir success")
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
            console.error(err)
            callback('文件改名失败')
        }else{
            console.log('receive&rename success')
            /*caseManager.findCase((list)=>{
                callback(list)
            })*/
            projectManager.findProjectWithModules((list)=>{
                callback(list)
            })
            // callback('上传成功')
        }
    })
}
exports.saveCase = saveCase
exports.findProjects = findProjects

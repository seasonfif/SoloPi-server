/*
* case获取与上传操作
* */
let fs = require('fs')
let path = require('path')
let sd = require('silly-datetime')
let formidable = require('formidable')
let caseManager = require('./case')
let projectManager = require('./project')
let mongoose = require('./db')
const {CaseSchema} = require("./case");

function findProjects(req, callback) {
    projectManager.findProjects((projects)=>{
        callback(projects)
    })
}

function findProjectWithModules(req, callback) {
    projectManager.findProjectWithModules((projects)=>{
        callback(projects)
    })
}

function saveCase(req, callback) {
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'
    form.uploadDir = path.normalize(__dirname + '/../tmp')  //缓存地址
    form.multiples = true  //设置为多文件上传
    form.keepExtensions = true   //是否包含文件后缀
    let file_list = []

    form.on('file', (name, file)=> {
        file_list.push([name, file])
    })

    form.parse(req, (err, fields, files)=>{
        // console.log(fields)
        if (err){
            callback("解析请求失败")
            return;
        }
        console.log(fields.extras)
        let caselist = JSON.parse(fields.extras)
        let caseSchemaMap = new Map()
        caselist.forEach((item, index)=>{
            let Case = mongoose.model('Case'+'_'+item.project, CaseSchema)
            let test_case = new Case({
                name: item.name,
                module: item.module,
                project: item.project,
                package: item.pkg,
                description: 'a test case',
                createdAt: new Date().getTime()
            })
            caseSchemaMap.set(test_case.name, test_case)
            test_case.save().then((result)=>{
                console.log('result: '+result)
            }).catch((err)=>{
                console.error(err)
            })
        })

        file_list.forEach((value, index, array)=>{
            // console.log(util.inspect({value: value, index: index}))
            let file = value[1]
            let file_name = file.name
            let project = 'default'
            let module = 'default'
            let caseSchema = caseSchemaMap.get(file_name)
            if (caseSchema.project){
                project = caseSchema.project
            }
            if (caseSchema.module){
                module = caseSchema.module
            }

            let ttt = sd.format(new Date(), 'YYYYMMDDHHmmss')
            let old_path = file.path
            let new_path = path.normalize(__dirname  + '/../uploads/' + project+'/'+module)

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
            callback('上传成功')
        }
    })
}
exports.saveCase = saveCase
exports.findProjects = findProjects
exports.findProjectWithModules = findProjectWithModules

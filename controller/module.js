let mongoose = require('./db')
Schema = mongoose.Schema

let ModuleSchema = new Schema({
    name : String,
    project: String,
    createdAt : Number
})

let Module = mongoose.model('module', ModuleSchema)

let module_list = []
module_list.push(new Module({
    name: "feed",
    project: 'sogou browser',
    createdAt: new Date().getTime()
}))

module_list.push(new Module({
    name: "account",
    project: 'sogou browser',
    createdAt: new Date().getTime()
}))

module_list.push(new Module({
    name: "browser",
    project: 'sogou browser',
    createdAt: new Date().getTime()
}))

module_list.push(new Module({
    name: "setting",
    project: 'streamline',
    createdAt: new Date().getTime()
}))

module_list.push(new Module({
    name: "browser",
    project: 'streamline',
    createdAt: new Date().getTime()
}))

/**
 * 生成默认module数据
 */
/*Module.insertMany(module_list).then((result)=>{
    console.log('result: '+result)
}).catch((err)=>{
    console.error(err)
})*/

function findModules(callback){
    Module.find().then((resolve)=>{
        console.log("resolve: "+resolve.length)
        callback(JSON.stringify(resolve))
    }).catch((err)=>{
        console.error(err)
    })
}

exports.findModules = findModules

/*findModules((json)=>{
    let projects = JSON.parse(json)
    console.log(projects.length)
})*/


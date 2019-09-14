let mongoose = require('./db')
Schema = mongoose.Schema

let ModuleSchema = new Schema({
    name : String,
    project: String,
    createdAt : Number
})

let Module = mongoose.model('module', ModuleSchema)
module.exports = Module

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


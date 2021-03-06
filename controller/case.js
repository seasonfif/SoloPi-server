let mongoose = require('./db')
Schema = mongoose.Schema

let CaseSchema = new Schema({
    name : String,
    module: String,
    project: String,
    package: String,
    description : String,
    rname: String,
    createdAt : Number
})

exports.CaseSchema = CaseSchema
// module.exports = CaseSchema

let project = 'streamline'
let Case = mongoose.model('Case'+'_'+project, CaseSchema)
let test_case = new Case({
    name: "test3",
    module: 'feed',
    project: project,
    package: 'sogou.mobile.explore',
    description: 'a test case',
    createdAt: new Date().getTime()
})

/*test_case.save().then((result)=>{
    console.log('result: '+result)
}).catch((err)=>{
    console.error(err)
})*/

function getCaseSchemaByProject(project) {
    return mongoose.model('Case'+'_'+project, CaseSchema)
}

function findCase(project, callback){
    let whereStr = {project: project}
    Case = getCaseSchemaByProject(project)
    Case.find(whereStr).then((resolve)=>{
        console.log("resolve: "+resolve.length)
        callback(resolve)
    }).catch((err)=>{
        console.error(err)
    })
}

exports.findCase = findCase


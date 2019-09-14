let mongoose = require('./db')
Schema = mongoose.Schema

let ProjectSchema = new Schema({
    name : String,
    package: String,
    createdAt : Number
})

let Project = mongoose.model('project', ProjectSchema)
module.exports = Project

function findProjects(callback){
    Project.find().then((resolve)=>{
        console.log("resolve: "+resolve.length)
        callback(JSON.stringify(resolve))
    }).catch((err)=>{
        console.error(err)
    })
}

function findProjectWithModules(callback){
    let pipeline = [
        {
            $lookup: {
                    from: 'modules',
                    localField: 'name',
                    foreignField: 'project',
                    as: 'modules'
                }
        }
    ]

    Project.aggregate(pipeline).then((resolve)=>{
        console.log("resolve: "+resolve)
        callback(JSON.stringify(resolve))
    }).catch((err)=>{
        console.error(err)
    })
}

exports.findProjects = findProjects
exports.findProjectWithModules = findProjectWithModules

/*findProjects((json)=>{
    let projects = JSON.parse(json)
    console.log(projects.length)
})*/

/*findProjectWithModules((json)=>{
    let projects = JSON.parse(json)
    console.log(projects)
})*/


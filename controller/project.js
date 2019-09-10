let mongoose = require('./db')
Schema = mongoose.Schema

let ProjectSchema = new Schema({
    name : String,
    package: String,
    createdAt : Number
})

let Project = mongoose.model('project', ProjectSchema)

let project_list = []
project_list.push(new Project({
    name: "sogou browser",
    package: 'sogou.mobile.explore',
    createdAt: new Date().getTime()
}))

project_list.push(new Project({
    name: "streamline",
    package: 'sogou.mobile.explore.streamline',
    createdAt: new Date().getTime()
}))

/**
 * 生成默认project数据
 */
/*Project.insertMany(project_list).then((result)=>{
    console.log('result: '+result)
}).catch((err)=>{
    console.error(err)
})*/

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


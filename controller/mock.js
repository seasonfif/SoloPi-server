let Project = require('./project')
let Module = require('./module')

let sogou_browser_project = "SogouBrowser"
let streamline_project = "Streamline"

function mockProject() {
    let project_list = []
    project_list.push(new Project({
        name: sogou_browser_project,
        package: 'sogou.mobile.explore',
        createdAt: new Date().getTime()
    }))

    project_list.push(new Project({
        name: streamline_project,
        package: 'sogou.mobile.explore.streamline',
        createdAt: new Date().getTime()
    }))

    /**
     * 生成默认project数据
     */
    Project.insertMany(project_list).then((result)=>{
        console.log('result: '+result)
    }).catch((err)=>{
        console.error(err)
    })
}

function mockModule() {
    let module_list = []
    module_list.push(new Module({
        name: "feed",
        project: sogou_browser_project,
        createdAt: new Date().getTime()
    }))

    module_list.push(new Module({
        name: "account",
        project: sogou_browser_project,
        createdAt: new Date().getTime()
    }))

    module_list.push(new Module({
        name: "browser",
        project: sogou_browser_project,
        createdAt: new Date().getTime()
    }))

    module_list.push(new Module({
        name: "setting",
        project: streamline_project,
        createdAt: new Date().getTime()
    }))

    module_list.push(new Module({
        name: "browser",
        project: streamline_project,
        createdAt: new Date().getTime()
    }))

    /**
     * 生成默认module数据
     */
    Module.insertMany(module_list).then((result)=>{
        console.log('result: '+result)
    }).catch((err)=>{
        console.error(err)
    })
}

// mockProject()
// mockModule()
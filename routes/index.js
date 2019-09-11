let express = require('express');
let router = express.Router();
let url = require('url')
let path = require('path')
let caseController = require('../controller/case_controller');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { folders: ['browser','feed','account','setting'] });
});

router.get('/uploads/*', (req, res)=>{
  let url_path = req.url
  let parse_url = url.parse(url_path, false)
  let file_path = path.normalize(__dirname + '/..' +parse_url.path);
  console.log(file_path)
  res.download(file_path)
})

router.get('/upload', (req, res)=>{
  caseController.findProjectWithModules(req, (projects)=>{
    res.render('upload', {projects:projects})
  })
});

router.post('/upload', (req, res)=>{
  res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'})
  caseController.saveCase(req, (err)=>{
    if (err){
      res.end(err)
    }else{
      res.write(err)
      res.end()
    }
  })
})

module.exports = router;

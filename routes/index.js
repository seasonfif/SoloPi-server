var express = require('express');
var router = express.Router();
let url = require('url')
let path = require('path')
let caseController = require('../controller/case');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { folders: ['browser','feed','account','setting'] });
});

router.get('/uploads/*', (req, res)=>{
  var url_path = req.url
  var parse_url = url.parse(url_path, false)
  var file_path = path.normalize(__dirname + '/..' +parse_url.path);
  console.log(file_path)
  res.download(file_path)
})

router.get('/upload', (req, res)=>{
  res.render('upload', {versions:['browser','feed','account','setting']})
  res.download()
});

router.post('/upload', (req, res)=>{
  res.writeHead(200, {'Content-Type' : 'text/plain; charset=utf-8'})
  caseController.uploadCaseToPath(req, (err)=>{
    if (err){
      res.end(err)
    }else{
      res.write(err)
      res.end()
    }
  })
})

module.exports = router;

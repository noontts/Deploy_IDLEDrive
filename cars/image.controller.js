const express = require('express');
const router = express.Router();

const fileSystem = require('fs');
const path = require('path');

router.get('/images/:filename',(req,res)=>{
    const fileName = req.params.filename;

    let currentDirectory = path.join(__dirname,'../uploads');
    let filePath = path.join(currentDirectory,`${fileName}`);
    let stat = fileSystem.statSync(filePath);

    res.writeHead(200,{
        'Content-Type': 'image/jpg',
        'Content-Length': stat.size
    })
    let readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(res);
})

module.exports = router;
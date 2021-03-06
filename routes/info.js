const express = require('express')
const fs = require('fs')
const path = require('path')
const opn = require('opn')
const exec = require('child_process').exec

var router = express.Router()

router.route('/')
.post((req, res, next) => {
    fullpath = path.join(process.env.HOME, req.params.name)
    if (fs.existsSync(fullpath)) {
        if (fs.lstatSync(fullpath).isDirectory()) {
            dir = fs.readdirSync(fullpath)
            folder = []
            for (var i=0; i<dir.length; i++) {
                if (!dir[i].startsWith(".") && !dir[i].endsWith(".desktop")) {
                    folder.push(dir[i])
                }
            }
            res.send([fullpath, folder])
        }
        else {
            opn(fullpath).then(result => {
                res.send({success: true})
            })
        }
    }
})

module.exports = router
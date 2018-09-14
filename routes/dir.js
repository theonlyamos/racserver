const express = require('express')
const fs = require('fs')
const path = require('path')
const opn = require('opn')

var router = express.Router()

router.route('/')
.get((req, res, next) => {
    dir = fs.readdirSync(process.env.HOME)
    home = []
    for (var i=0; i<dir.length; i++) {
        if (!dir[i].startsWith(".") && !dir[i].endsWith(".desktop")) {
            home.push(dir[i])
        }
    }
    res.send(home)
})

router.route('/')
.post((req, res, next) => {
    var name = req.body.name
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
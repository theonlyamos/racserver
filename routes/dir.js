const express = require('express')
const fs = require('fs')
const path = require('path')
const opn = require('opn')
const os = require('os')
const iconName = require('./checktype')

var router = express.Router()

router.route('/')
.get((req, res, next) => {
    var name = req.query.name
    if (name == 'home') {
        var fullpath = os.userInfo().homedir
    }
    else {
        var fullpath = name
    }

    if (fs.existsSync(fullpath)) {
        if (fs.lstatSync(fullpath).isDirectory()) {
            var dirs = fs.readdirSync(fullpath)
            var dirlist = []
            var files = []
            for (var i=0; i<dirs.length; i++) {
                if (!dirs[i].startsWith(".") && !dirs[i].endsWith(".desktop")) {
                    var dir = path.join(fullpath, dirs[i])
                    if (fs.lstatSync(dir).isDirectory()){
                        dirlist.push({name: path.basename(dir),
                                      fullpath: dir,
                                      type: 'folder'
                        })
                    }
                    else {
                        files.push({name: path.basename(dir),
                            fullpath: dir,
                            type: 'file',
                            icon: iconName(path.extname(dir))
                        })
                    }

                }
            }
            dirlist = dirlist.concat(files)
            res.send(dirlist)
        }
        else {
            opn(fullpath).then(result => {
                res.send({success: true})
            })
        }
    }
})
.post((req, res, next) => {
    var name = req.body.name
    fullpath = path.join(process.env.HOME, req.params.name)
    if (!fs.existsSync(fullpath)) {
        fs.mkdirSync(fullpath)
        res.send({success: true})
    }else{
        res.send({success: false})
    }
})
.put((req, res, next) => {
    name = req.query.path
    if (fs.existsSync(path)) {

    }
})



module.exports = router
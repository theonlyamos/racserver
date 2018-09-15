const express = require('express')
const exec = require('child_process').exec

var router = express.Router()

router.route('/')
.get((req, res, next) => {
    exec("wmctrl -l | awk '{$3=\"\";$2=\"\";$1=\"\";print $0}'", (err, stdout, stderr) => {
        var windows = stdout.split('\n')
        res.send(windows)
    })
})
.post((req, res, next) => {
    var windowName = req.body.window
    exec("xdotool search --name '"+windowName+"'", (err, stdout, stderr) => {
        if (!err) {
            exec("xdotool windowactivate "+stdout, (err, stdout, stderr) => {
                res.send({success: true})
            })
        }
    })
})
.delete((req, res, next) => {
    var win = req.query.window
    exec("xdotool search --name '"+win+"'", (err, stdout, stderr) => {
        if (!err) {
            exec("xdotool windowclose "+stdout, (err, stdout, stderr) => {
                res.send({success: true})
            })
        }
    })
})

module.exports = router
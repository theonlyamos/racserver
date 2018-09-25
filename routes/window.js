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
    /*windowName = windowName.replace("(", "\(")
    windowName = windowName.replace(")", "\)")
    windowName = windowName.replace("[", "\[")
    windowName = windowName.replace("]", "\]")
    */
   if (windowName.includes('(')) {
       windowName = windowName.substring(0, windowName.indexOf('(')-1)
   }
   if (windowName.includes('[')) {
        windowName = windowName.substring(0, windowName.indexOf(']')-1)
   }
    exec('xdotool search --name "'+windowName+'"', (err, stdout, stderr) => {
        if (!err) {
            exec("xdotool windowactivate "+stdout, (err, stdout, stderr) => {
                res.send({success: true})
            })
        }
    })
})
.delete((req, res, next) => {
    var windowName = req.query.window
    /*
    windowName = windowName.replace("(", "\\(")
    windowName = windowName.replace(")", "\\)")
    windowName = windowName.replace("[", "\\[")
    windowName = windowName.replace("]", "\\]")
    */
    if (windowName.includes('(')) {
        windowName = windowName.substring(0, windowName.indexOf('(')-1)
    }
    if (windowName.includes('[')) {
            windowName = windowName.substring(0, windowName.indexOf('[')-1)
    }
    exec("xdotool search --name '"+windowName+"'", (err, stdout, stderr) => {
        if (!err) {
            exec("xdotool windowkill "+stdout, (err, stdout, stderr) => {
                res.send({success: true})
            })
        }
        else {
            res.send({success: false})
        }
    })
})

module.exports = router
const express = require('express')
const exec = require('child_process').exec

var router = express.Router()

var commands = {'shutdown': 'shutdown 0',
                'lock': 'xdg-screensaver lock'
}

router.route('/')
.get((req, res, next) => {
  var cmd = req.query.cmd
  exec(commands[cmd], (err, stdout, stderr) => {
    if (!err) {
      return res.send({success: true, message: stdout})
    }
    res.send({success: false, message: 'Error completing command'})
  })
})

router.route('/key')
.post((req, res, next) => {
  var key = req.body.key
  exec('xdotool key ' + key, (err, stdout, stderr) => {
    if (!err) {
      return res.send({success: true})
    }
    res.send({success: false})
  })
})

module.exports = router
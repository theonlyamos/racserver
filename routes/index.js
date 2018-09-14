const express = require('express')
const os = require('os')

var router = express.Router()

router.route('/')
.get((req, res, next) => {
    var info = {}
    info.uid = os.userInfo().uid
    info.arch = os.arch()
    info.username = os.userInfo().username
    info.homedir = os.userInfo().homedir
    info.hostname = os.hostname()
    info.memory = {}
    info.memory.total = os.totalmem()/(1024*1024)
    info.memory.free = os.freemem()/(1024*1024)
    info.interfaces = Object.keys(os.networkInterfaces())
    info.cpuusage = process.cpuUsage()
    info.uptime = ((os.uptime()/60).toFixed(0)+":"+(os.uptime()%60).toFixed(0))
    info.platform = os.type()
    res.send(info)
})

module.exports = router
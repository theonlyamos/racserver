const express = require('express')
const cors = require('cors');

var backend = express()
const server = require('http').Server(backend)

backend.set('view engine', 'jade');

var port = normalizePort(process.env.PORT || '1995');
backend.set('host', '0.0.0.0')
backend.set('port', port)

backend.use(express.json())
backend.use(express.urlencoded({extended: true}))
backend.use(cors())

var indexRoute = require('./routes/index')
var dirRoute = require('./routes/dir')
var infoRoute = require('./routes/info')
var windowRoute = require('./routes/window')

backend.use('/', indexRoute)
backend.use('/dir', dirRoute)
backend.use('/info', infoRoute)
backend.use('/window', windowRoute)

backend.use(function(req, res, next) {
    next(createError(404));
});

backend.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status = (err.status || 500);
  throw err
});

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}
  
function onListening() {
  var addr = server.address();
  console.log("Listening on port "+addr.port)
}



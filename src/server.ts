#!/usr/bin/env node

/**
 * Module dependencies.
 */

import config from './config/config';

import { HttpError } from "http-errors";

var app = require('./app.ts');
var debug = require('debug')('llmscriptgen:server');
var http = require('http');

/**
 * Get port from environment and store in Express.
 */

app.set('port', config.port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(config.port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error: HttpError) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = 'Port ' + config.port;

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

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}

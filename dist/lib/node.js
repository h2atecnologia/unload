'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
// set to true to log events
var DEBUG = false;

function add(fn) {
    process.on('exit', function () {
        DEBUG && console.log('node: exit');
        return fn();
    });

    /**
     * on the following events,
     * the process will not end if there are
     * event-handlers attached,
     * therefore we have to call process.exit()
     */
    process.on('beforeExit', function () {
        DEBUG && console.log('node: beforeExit');
        return fn().then(function () {
            return process.exit();
        });
    });
    // catches ctrl+c event
    process.on('SIGINT', function () {
        DEBUG && console.log('node: SIGNINT');
        return fn().then(function () {
            return process.exit();
        });
    });
    // catches uncaught exceptions
    process.on('uncaughtException', function () {
        DEBUG && console.log('node: uncaughtException');
        return fn().then(function () {
            return process.exit();
        });
    });
}

exports['default'] = {
    add: add
};
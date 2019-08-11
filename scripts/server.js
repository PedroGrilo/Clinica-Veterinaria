var createServer = require("http").createServer;
var options = require("./options").server;

function start(router, port) {
    var onRequest = function onRequest(request, response) {
        router(request, response);
    }
    createServer(onRequest)
        .listen(port || options.port);
}

module.exports.start = start;
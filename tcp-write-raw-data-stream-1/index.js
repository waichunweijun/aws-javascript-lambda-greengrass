const ggSdk = require('aws-greengrass-core-sdk');
const {
    StreamManagerClient,
} = require('aws-greengrass-core-sdk').StreamManager;
const util = require("util");
const STREAM_NAME = 'rawStream';
const net = require('net');

//define host and port to run the server
const port = 1109;
const host = '10.0.0.149';
//Create an instance of the server
console.log("creating server instance");
const server = net.createServer(onClientConnection);
//Start listening with the server on given port and host.
server.listen(port, host, function() {
    console.log(`Server started on port ${port} at ${host}`);
});

let tcpData = [];
let chunks = [];

//Declare connection listener function
function onClientConnection(sock) {

    sock.setKeepAlive(true, 60000);

    sock.on('data', function(data) {
        chunks.push(data);

    }).on('end', function() {
        console.log("payload fully received");
        //convert to JS obj when all tcp data successfully arrived    
        let temp = Buffer.concat(chunks);
        let stringData = temp.toString("utf-8").replace(/\0/g, '').trim();
        tcpData.push(JSON.parse(stringData));
        console.dir(tcpData);
        //empty chuck array for next incoming data
        chunks = [];
    });
    //Handle client connection termination.
    sock.on('close', function() {
        console.log(`Client has terminated the connection`);
    });
    //Handle Client connection error.
    sock.on('error', function(error) {
        console.error(` Connection Error ${error}`);
    });
}

const c = new StreamManagerClient();
c.onConnected(async() => {
    while (true) {
        try {
            let utf8Encode = new util.TextEncoder();
            console.log("Listening to TCP for data...");
            if (tcpData && tcpData.length > 0) {
                for (let i = 0; i < tcpData.length; i++) {
                    for (let n = 0; n < tcpData[i].length; n++) {
                        let data = tcpData[i][n];
                        console.log(`data type of data is : ${typeof(data)}`);
                        
                        let jsonStr = JSON.stringify(data);
                        console.log(jsonStr);
                        const payload = utf8Encode.encode(jsonStr);
                        let message = Buffer.from(payload, 'utf8');
                        const sequenceNumber = await c.appendMessage(STREAM_NAME, message);
                        console.log(`message sequence number ${sequenceNumber}`);
                    }
                }
            }
            else {
                console.log("No TCP data. Sleeping for 5 seconds...");
                await sleep(5000);
            }
        }
        catch (e) {
            console.log("caught error");
            console.log(e);
        }
    }
});

process.on('unhandledRejection', (reason, promise) => {
    console.log("unhandledRejection detected, retrying...");

});

c.onError((err) => {
    console.log(err);
});

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


exports.handler = function handler(event, context) {
    //console.log(event);
    //console.log(context);
};

const ggSdk = require('aws-greengrass-core-sdk');

const iotClient = new ggSdk.IotData();
const lambdaClient = new ggSdk.Lambda();
const os = require('os');
const util = require('util');

const cxt = {
    custom: {
        customData: 'customData',
    },
};

const contextString = JSON.stringify(cxt);
const buff = Buffer.from(contextString);
const clientContext = buff.toString('base64');

let invokeCount = 0;

const myPlatform = util.format('%s-%s', os.platform(), os.release());
const net = require('net');

//define host and port to run the server
const port = 8080;
const host = '192.168.128.66';
//Create an instance of the server
console.log("creating server instance");
const server = net.createServer(onClientConnection);
//Start listening with the server on given port and host.
server.listen(port, host, function() {
    console.log(`Server started on port ${port} at ${host}`);
});

//Declare connection listener function
function onClientConnection(sock) {
    //Log when a client connnects.
    //console.log(`${sock.remoteAddress}:${sock.remotePort} Connected`);
    //Listen for data from the connected client.
    sock.setKeepAlive(true,60000);
    
    sock.on('data', function(data) {
        //Log data from the client
        //console.log("here here");
        
        //console.log(`${sock.remoteAddress}:${sock.remotePort} Says : ${data} `);

        console.log(data)

        //invoke lambda function
        // const params = {
        //     FunctionName: 'arn:aws:lambda:ap-southeast-1:090385916966:function:gpsreceiver',
        //     InvocationType: 'RequestResponse',
        //     ClientContext: clientContext,
        //     Payload: data,
        // };

        // lambdaClient.invoke(params, (err, data) => {
        //     if (err) {
        //         console.error(err, err.stack);
        //     }
        //     else {
        //         console.log(data);
        //     }
        // });
        //Send back the data to the client.
        //sock.write(`You Said ${data}`);
        //invokeCount++;
        //console.log(`the current invocation count is ${invokeCount}`);
    });
    //Handle client connection termination.
    sock.on('close', function() {
        
        console.log(`${sock.remoteAddress}:${sock.remotePort} count ${invokeCount} Terminated the connection`);
    });
    //Handle Client connection error.
    sock.on('error', function(error) {
        console.error(`${sock.remoteAddress}:${sock.remotePort} Connection Error ${error}`);
    });
};

exports.handler = function handler(event, context) {
    //console.log(event);
    //console.log(context);
};

var net = require('net');
const buffer = require('buffer');
let host = '10.0.0.149';
let port = 1109;
var client = new net.Socket();
const { performance } = require('perf_hooks');

let data = [];
let numOfSample = 10;

for(let i=0; i<numOfSample; i++){
    let payload = {
        uwinloc: { owner_id: 'uwinloc' },
        facets: [{
            facet_id: Math.floor(Math.random() * 1000000000),
            facet_name: 'tag',
            producer_id: 'api',
            creation_time: Date.now(),
            last_modification_time: Date.now(),
            type_semantic: {
                blah: "blahblah"
            },
            type_representation: 'uwl.repr.tag',
            content: [{
                ID: 1234,
                IsLandMark: false,
                Pos: {
                    Cart: { X: Math.random(), Y: Math.random(), Z: Math.random() },
                    LLA: {
                        Lat: Math.random(),
                        Lon: Math.random(),
                        Alt: Math.random()
                    }
                },
                Status: 'ThreeD',
                Reliability: 100,
                Algorithm: 'Placed',
                Filtered: false
            }],
            flight_recorder: null
        }],
        summary: [
            { facet_id: '240c4d8f-c2eb-4d74-8dac-6e6fe6257203', status: 'new' }
        ],
        history: null
    };

    //let jsonStr = JSON.stringify(payload);

    data.push(payload);
}

let dataBuffer = Buffer.alloc(1024*numOfSample);

dataBuffer.write(JSON.stringify(data) ,'utf-8');

client.connect(port, host, () => {
    client.setKeepAlive(true,60000)
    console.time('test');
    const t0 = performance.now();
    try{
        client.write(dataBuffer);
        client.end();
    }
    catch(err){
        console.log(err);
    }
    
    console.log("sent");

    console.timeEnd('test');
});


client.on('close', () => {
    console.log('Connection closed');
});



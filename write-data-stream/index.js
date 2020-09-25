const {
    StreamManagerClient,
    ReadMessagesOptions,
    ExportDefinition,
    KinesisConfig,
    MessageStreamDefinition,
    StrategyOnFull,
    ResourceNotFoundException,
} = require('aws-greengrass-core-sdk').StreamManager;
const util = require("util");
const STREAM_NAME = 'rawStream';
const KINESIS_STREAM_NAME = 'rawKinesisStream';

const c = new StreamManagerClient();
c.onConnected(async() => {
    while (true) {
        try {
            console.log("writing to stream");
            let utf8Encode = new util.TextEncoder();

            let data = {
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

            let jsonStr = JSON.stringify(data);
            const payload = utf8Encode.encode(jsonStr);
            let message = Buffer.from(payload, 'utf8');
            const sequenceNumber = await c.appendMessage(STREAM_NAME, message);
            console.log(`message sequence number ${sequenceNumber}`);
            await sleep(1);
        }
        catch (e) {
            console.log("caught error");
            console.log(e);
        }
    }

});

process.on('unhandledRejection', (reason, promise) => {
  console.log('Error: Caught unhandled rejection, retrying.');
});

c.onError((err) => {
    console.log(err);
});


function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}


exports.handler = function handler() {
    return "";
};
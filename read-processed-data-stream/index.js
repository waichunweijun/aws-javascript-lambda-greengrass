const {
    StreamManagerClient,
    ReadMessagesOptions,
    ExportDefinition,
    KinesisConfig,
    MessageStreamDefinition,
    StrategyOnFull,
    ResourceNotFoundException,
} = require('aws-greengrass-core-sdk').StreamManager;

const STREAM_NAME = 'processedDataStream';
const KINESIS_STREAM_NAME = 'processedKinesisStream';

let startSequence = 0;
const client = new StreamManagerClient();
const seq = {};
const readDataStream = (startSequence) => {
    client.onConnected(async() => {
        const interval = setInterval(async() => {
            while (true) {
                try {
                    const messages = await client.readMessages(STREAM_NAME,
                        new ReadMessagesOptions()
                        .withDesiredStartSequenceNumber(startSequence)
                        .withMinMessageCount(1)
                        //max value available from sdk
                        .withMaxMessageCount(2147483647)
                    );


                    for (let i = 0; i < messages.length; i++) {
                        if (!seq[messages[i].sequenceNumber]) {
                            console.log(`Message object sequence number: ${messages[i].sequenceNumber}`);
                            console.log(`Message object payload: ${messages[i].payload.toString('utf8')}`);
                            seq[messages[i].sequenceNumber] = true;
                        }
                    }

                    // find out what is the last sequence number in this pass thru
                    let endSequence = messages[messages.length - 1].sequenceNumber;
                    //set the next sequence number
                    startSequence = endSequence;
                }
                catch (e) {
                    clearInterval(interval);
                    console.log(e);
                }
            }
        }, 500);
    });
    client.onError((err) => {
        console.log(err);
    });

};

//starting to read from data stream on a 1 sec interval, in every iteration, the start sequence will be the previous iteration's last sequence number
readDataStream(startSequence);

module.exports.handler = function handler() {
    return '';
};
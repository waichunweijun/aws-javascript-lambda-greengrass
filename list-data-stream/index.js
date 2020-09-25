const {
    StreamManagerClient,
    ReadMessagesOptions,
    ExportDefinition,
    KinesisConfig,
    MessageStreamDefinition,
    StrategyOnFull,
    ResourceNotFoundException,
} = require('aws-greengrass-core-sdk').StreamManager;

const STREAM_NAME = 'SomeStream';
const KINESIS_STREAM_NAME = 'MyKinesisStream';

const client = new StreamManagerClient();
    client.onConnected(async() => {
    let retry;
    do {
        try {
            const streams = await client.listStreams();
            console.log(streams);
        }
        catch (e) {
            console.log(e);
            retry = true;
        }
    } while (retry);

})
client.onError((err) => {
    console.log(err);
});
module.exports.handler = function handler() {
    return '';
};
const {
    StreamManagerClient,
    ExportDefinition,
    KinesisConfig,
    MessageStreamDefinition,
    StrategyOnFull,
    ResourceNotFoundException,
} = require('aws-greengrass-core-sdk').StreamManager;

const STREAM_NAME = 'rawStream';
//const KINESIS_STREAM_NAME = 'rawKinesisStream';

const c = new StreamManagerClient();
c.onConnected(async() => {
    try {
        await c.deleteMessageStream(STREAM_NAME);
    }
    catch (e) {
        // Rethrow the error if it wasn't the expected error
        if (!(e instanceof ResourceNotFoundException)) {
            throw e;
        }
    }
    try {

        await c.createMessageStream(
            new MessageStreamDefinition()
            .withName(STREAM_NAME)
            .withStrategyOnFull(StrategyOnFull.OverwriteOldestData)
        );
    }
    catch (e) {
     console.log("error creating message stream");
    }
});
process.on('unhandledRejection', (reason, promise) => {
  console.log('Unhandled Rejection at:', promise, 'reason:', reason);
 
});
c.onError((err) => {
    console.log(err);
});

module.exports.handler = function handler() {
    return '';
};
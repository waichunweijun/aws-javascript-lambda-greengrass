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
            const description = await client.describeMessageStream(STREAM_NAME);
            const lastErrorMessage = description.exportStatuses[0].errorMessage;
            if (lastErrorMessage) {
                // The last export of export destination 0 failed with some error.
                // Here is the last sequence number that was successfully exported.
                description.exportStatuses[0].lastExportedSequenceNumber;
            }

            if (description.storageStatus.newestSequenceNumber >
                description.exportStatuses[0].lastExportedSequenceNumber) {
                // The end of the stream is ahead of the last exported sequence number.
                console.log(description);
            }
            
            console.log(description);
            retry = false;
        }
        catch (e) {
            console.log(e);
            retry = true;
        }
    } while (retry);

});

client.onError((err) => {
    console.log(err);
});

module.exports.handler = function handler() {
    return '';
};
const {
    StreamManagerClient,
    ExportDefinition,
    KinesisConfig,
    MessageStreamDefinition,
    StrategyOnFull,
    ResourceNotFoundException,
} = require('aws-greengrass-core-sdk').StreamManager;

const STREAM_NAME = 'processedDataStream';
const KINESIS_STREAM_NAME = 'processedKinesisStream';

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
        const exports = new ExportDefinition()
            .withKinesis([new KinesisConfig()
                .withIdentifier(`KinesisExport${STREAM_NAME}`)
                .withKinesisStreamName(KINESIS_STREAM_NAME)
            ]);

        await c.createMessageStream(
            new MessageStreamDefinition()
            .withName(STREAM_NAME)
            .withStrategyOnFull(StrategyOnFull.OverwriteOldestData)
            .withExportDefinition(exports),
        );
    }
    catch (e) {
     console.log("error creating message stream");
    }
});
c.onError((err) => {
    console.log(err);
});

module.exports.handler = function handler() {
    return '';
};
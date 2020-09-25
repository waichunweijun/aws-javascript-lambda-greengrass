# aws-javascript-lambda-greengrass


- create-data-stream  
  > Create a data stream named rawStream that will ingest raw JSON payload

- write-data-stream
  > Append raw JSON payload to data stream rawStream

- read-data-stream
  > Retrieve raw JSON payload from data stream rawStream, transform the raw JSON payload into a lightweight JSON payload, and write the processed JSON payload into     a data stream named processedDataStream.

- create-processed-data-stream
  > Create a data stream named processedDataStream that will ingest processed JSON payload.
    Additionally, this data stream will be exported to kinesis data stream named: processedKinesisStream
    
- (Optional) read-processed-data-stream
  > Read the processed JSON payload that was written by read-data-stream

# aws-javascript-greengrass-lambda
Node.js codes for local lambda function running in Edge gateway

This is a sample showcase of lambda function that will be running in an edge gateway running AWS Greengrass software.
This project is meant to simulate writing a JSON payload to data-stream. 

## What is AWS greengrass and why deploy Lambda function on greengrass?
AWS IoT Greengrass is software that extends cloud capabilities to local devices. This enables devices to collect and analyze data closer to the source of information, react autonomously to local events, and communicate securely with each other on local networks. Local devices can also communicate securely with AWS IoT Core and export IoT data to the AWS Cloud. With a lambda function running locally in an edge gateway, it reduces the cost of cloud services as well.


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
    
- tcp-write-raw-data-stream-1
  > TCP server that will listen to JSON payload and write raw JSON payload to data stream rawStream. Multiple tcp-write functionsc can be created to simulate load to data stream.
  
- tcpclient.js
  > TCP client that will send JSON payload in buffer to TCP server (tcp-write-raw-data-stream-1).
    
- (Optional) read-processed-data-stream
  > Read the processed JSON payload that was written by read-data-stream
  

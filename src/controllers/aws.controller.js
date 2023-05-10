const AWS = require("aws-sdk");

var queueURL = process.env.SQS_QUEUE_URL;
var myCredentials = new AWS.Credentials(
  {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    sessionToken: process.env.AWS_SESSION_TOKEN,
  }
);
var sqs = new AWS.SQS({
  credentials: myCredentials,
  region: process.env.SQS_REGION,
  endpoint: process.env.SQS_QUEUE_URL, // En entrega final se puede eliminar porque se van a tener las credenciales
});

module.exports = {
  IsQueueInitialized: function () {
    if (queueURL) {
      return true;
    } else {
      return false;
    }
  },
  SetQueueURL: function (URL) {
    queueURL = URL;
  },
  ListQueues: async function () {
    var params = {};

    return await sqs.listQueues(params).promise();
  },

  CreateQueue: async function (name) {
    var params = {
      QueueName: name,
      Attributes: {
        VisibilityTimeout: "30",
      },
    };

    return await sqs.createQueue(params).promise();
  },

  PushToQueue: async function (body) {
    if (!queueURL) {
      return console.log("Queue not initialized");
    }

    var params = {
      MessageBody: JSON.stringify(body),
      QueueUrl: queueURL,
      MessageAttributes: {
        testId: {
          DataType: "Number",
          StringValue: "0",
        },
      },
    };

    return await sqs.sendMessage(params).promise();
  },

  PullFromQueue: async function () {
    if (!queueURL) {
      return console.log("Queue not initialized");
    }

    var params = {
      QueueUrl: queueURL,
    };

    return await sqs.receiveMessage(params).promise();
  },
};

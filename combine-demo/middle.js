const logger = require("../logger");
const { kafka } = require("../kafka");
const mqttClient = require("../mqtt");

let producer;

const start = async () => {
  try {
    producer = kafka.producer();

    await producer.connect();
    logger.info("Connected to Kafka Broker!");
  } catch (error) {
    logger.error(error);
    process.exit(1);
  }
};

const sendToKafka = async (topic, message) => {
  const kafkaMessage = { key: topic[2], value: message };

  await producer.send({
    topic: "readings",
    messages: [kafkaMessage],
  });
};

const onMessage = async (topic, message) => {
  const messageString = message.toString();

  if (topic.match(/[a-z0-9\/]+temp/g)) {
    logger.info(`topic: ${topic} message: ${messageString}`);
    await sendToKafka(topic, message);
  }
};

start();

mqttClient.subscribe("#");
mqttClient.on("message", onMessage);

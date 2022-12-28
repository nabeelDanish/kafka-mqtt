const { Kafka } = require("kafkajs");

const kafka = new Kafka({ clientId: "producer", brokers: ["localhost:29092"] });

module.exports.kafka = kafka;

module.exports.sleep = async (interval) => {
  return new Promise((resolve) => {
    setTimeout(resolve, interval);
  });
};

const { kafka } = require("../kafka");
const logger = require("../logger");

const start = async () => {
  try {
    const consumer = kafka.consumer({ groupId: "dashboard" });

    await consumer.connect();
    logger.info("Connected to Kafka Broker!");

    await consumer.subscribe({ topic: "readings", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        logger.info(
          `Received: topic: "${topic}" key: ${message.key.toString()} message: ${message.value.toString()}`
        );
      },
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

const { kafka, sleep } = require("../kafka");
const logger = require("../logger");

const start = async () => {
  try {
    const producer = kafka.producer();

    await producer.connect();
    console.log("Connected to Kafka Broker!");

    while (true) {
      const message = { key: "0", value: (Math.random() * 50).toString() };

      logger.info(`Sending message: ${message}`);

      await producer.send({
        topic: "temperature",
        messages: [message],
      });

      await sleep(5000);
    }
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

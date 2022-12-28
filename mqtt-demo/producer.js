const logger = require("../logger");
const mqttClient = require("../mqtt");
const { sleep } = require("../kafka");

const TOTAL_DEVICES = 4;
const MAX_TEMPERATURE = 50;

const onConnect = async () => {
  logger.info("Connected to MQTT Client");

  while (true) {
    try {
      const deviceId = Math.ceil(Math.random() * TOTAL_DEVICES);
      const topic = `s/${deviceId}/temp`;
      const temperature = Math.random() * MAX_TEMPERATURE;

      const message = JSON.stringify({ temperature: temperature.toString() });

      logger.info(
        `Publishing to MQTT deviceId: ${deviceId} topic: ${topic} message: ${message}`
      );

      await mqttClient.publish(topic, message);
      await sleep(5000);
    } catch (error) {
      logger.error(error);
      process.exit();
    }
  }
};

onConnect();

const logger = require("../logger");
const mqttClient = require("../mqtt");
const { sleep } = require("../kafka");

const TOTAL_DEVICES = 4;
const MAX_TEMPERATURE = 50;
const MAX_HUMIDITY = 100;

const onConnect = async () => {
  logger.info("Connected to MQTT Client");

  while (true) {
    try {
      const deviceId = Math.ceil(Math.random() * TOTAL_DEVICES);
      let message, topic, temperature, humid;

      switch (Math.round(Math.random())) {
        case 1:
          topic = `s/${deviceId}/temp`;
          temperature = Math.ceil(Math.random() * MAX_TEMPERATURE);
          message = JSON.stringify({ temperature: temperature.toString() });
          break;
        case 0:
          topic = `s/${deviceId}/humid`;
          humid = Math.ceil(Math.random() * MAX_HUMIDITY);
          message = JSON.stringify({ humidity: humid.toString() });
          break;
        default:
          logger.error("Invalid Choice!");
          process.exit();
      }

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

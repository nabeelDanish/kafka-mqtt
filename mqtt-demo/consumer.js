const logger = require("../logger");
const mqttClient = require("../mqtt");

const onMessage = async (topic, message) => {
  const messageString = message.toString();

  if (topic.match(/[a-z0-9\/]+temp/g))
    logger.info(`topic: ${topic} message: ${messageString}`);
};

mqttClient.subscribe("#");
mqttClient.on("message", onMessage);

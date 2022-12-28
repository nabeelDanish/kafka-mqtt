const logger = require("./logger");
const MQTT = require("async-mqtt");

const client = MQTT.connect("http://localhost:1883/", {
  username: "nabeel-danish",
  password: "Gaming4life",
});

const onConnect = async () => {
  logger.info("Connected to MQTT Broker!");
};

const onError = async (error) => {
  logger.error(error);
};

client.on("connect", onConnect);
client.on("error", onError);

module.exports = client;

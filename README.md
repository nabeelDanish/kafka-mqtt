# Apache Kafka and MQTT Connection

A simple proof-of-concept Node JS application that demonstrates the use case, and connection of MQTT and Apache Kafka.

The demo simulates a Air Conditioning Device that has two sensors `temperature` and `humidity`. The device sends data at random intervals which corresponds to these sensor readings.

# Setup

1. First ensure that you have the latest versions of Docker, Docker Compose, and Node JS Installed.

2. Run `docker compose -f dev-docker-compose.yml up` to instantiate Zookeeper and Kafka Containers

3. Make sure you are running an MQTT broker service. If you don't have one already, use the following image to start a mosquito container

```
mosquitto:
    container_name: mosquitto-realtime
    image: eclipse-mosquitto:2.0.15
    ports:
      - "${MOSQUITTO_MQTT_PORT}:1883"
      - "${MOSQUITTO_SECURE_PORT}:8883"
      - "${MOSQUITTO_WS_PORT}:8080"
    volumes:
      - ./mosquitto/dev.mosquitto.conf:/mosquitto/config/mosquitto.conf
      - ./mosquitto/passwordfile:/mosquitto/passwordfile
      - ./mosquitto/docker-entrypoint.sh:/docker-entrypoint.sh
      - mosquitto-data-vol:/mosquitto/data
      - mosquitto-log-vol:/mosquitto/log
```

Ensure that you have the following files too:

```
mosquitto
    ---> dev.mosquitto.conf
    ---> passwordfile
    ---> docker-entrypoint.sh
```

## Running the Demo

Once the services (`Apache Kafka, Zookeeper, and MQTT Broker`) are up and running, you can run the following demos

### 1. MQTT Only Demo

- Run the Producer using: `npm run mqtt:produce`

- Run the Consumer using: `npm run mqtt:consume`

### 2. Kafka Only Demo

- Run the Producer using: `npm run kafka:produce`

- Run the Consumer using: `npm run kafka:consume`

### 3. Combined Demo

- Run the Producer using: `npm run combine:produce`

- Run the Middle using: `npm run combine:middle`

- Run the Consumer using: `npm run combine:consume`

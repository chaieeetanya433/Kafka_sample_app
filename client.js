// Import the Kafka module from kafkajs
const { Kafka } = require("kafkajs");

// Create a Kafka instance with a client ID and broker(s) configuration
const kafka = new Kafka({
    clientId: "my-app",
    brokers: ['172.25.112.1:9092'],
})

// Export the configured Kafka instance for use in other files
module.exports = kafka;

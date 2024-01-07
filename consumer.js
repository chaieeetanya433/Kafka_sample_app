// Import the Kafka client module
const kafka = require('./client');
// Retrieve the consumer group name from the command line arguments
const group = process.argv[2];

// Initialization function for the consumer
async function init() {
    // Create an instance of the consumer with the specified group ID
    const consumer = kafka.consumer({ groupId: group });
    
    // Connect the consumer to the Kafka cluster
    await consumer.connect();

    // Subscribe the consumer to the 'rider-updates' topic from the beginning
    await consumer.subscribe({ topics: ['rider-updates'], fromBeginning: true });

    // Run the consumer to start processing messages
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            // Log the received message details (topic, partition, value)
            console.log(`${group}: [${topic}]: PART:${partition}:`, message.value.toString());
        },
    });
}

// Invoke the initialization function
init();

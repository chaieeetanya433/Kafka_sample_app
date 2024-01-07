// Import the Kafka client module
const kafka = require('./client');

// Initialization function for the admin client
async function init() {
    // Create an instance of the admin client
    const admin = kafka.admin();

    // Log that the admin client is connecting
    console.log('Admin connecting');

    // Connect the admin client to the Kafka cluster
    admin.connect();
    // Log success message upon successful connection
    console.log('Admin connection success');

    // Log the creation of a Kafka topic named 'rider-updates' with 2 partitions
    console.log('Creating Topic [rider-updates]');
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2
        }]
    });
    // Log success message upon successful topic creation
    console.log('Topic Created Success [rider-updates]');

    // Log message indicating disconnecting the admin client
    console.log('Disconnecting Admin...');

    // Disconnect the admin client from the Kafka cluster
    await admin.disconnect();
}

// Invoke the initialization function
init();

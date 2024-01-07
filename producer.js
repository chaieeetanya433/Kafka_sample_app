// Import the Kafka client module
const kafka = require("./client");
// Import the readline module for reading input from the console
const readline = require('readline');

// Create a readline interface for reading input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialization function for the producer
async function init() {
    // Create an instance of the producer
    const producer = kafka.producer();

    // Log a message indicating the connection of the producer
    console.log("Connection Producer");
    // Connect the producer to the Kafka cluster
    await producer.connect();
    // Log success message upon successful connection
    console.log("Producer Connected Successfully");

    // Set up a prompt for the user to input messages
    rl.setPrompt('> ');
    rl.prompt();

    // Listen for user input and send messages to the 'rider-updates' topic
    rl.on('line', async function(line) {
        // Parse the input line into riderName and location
        const [riderName, location] = line.split(' ')
        // Send a message to the 'rider-updates' topic with partition based on location
        await producer.send({
            topic: "rider-updates",
            messages: [
                {
                    partition: location.toLowerCase() === "north" ? 0 : 1,
                    key: "location-update",
                    value: JSON.stringify({ name: riderName, loc: location }),
                },
            ],
        });
    }).on('close', async() => {
        // Log a message indicating disconnecting the producer
        console.log('Disconnecting Producer...');
        // Disconnect the producer from the Kafka cluster upon program exit
        await producer.disconnect();
    });
}

// Invoke the initialization function
init();

/* this script creates a UDP server that listens for incoming UDP packets 
on port 8888 and sends the messages to protopie connect 
it expects UDP messages in the format "message:value"
*/

// Libraries (install with npm install ...)
const dgram = require('dgram');
const { Builder, By, until, Key } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

// UDP server setup
const UDP_PORT = 8888;
const udpServer = dgram.createSocket('udp4');

// Callback function to handle incoming messages
udpServer.on('message', (msg) => {
    msgParts = msg.toString().split(':');
});

// Bind the server (Start listening for incoming UDP packets)
udpServer.bind(UDP_PORT);

// Message variable to hold incoming message
let msgParts = ['default', 0];

// Create protopie sender class
class ProtoPieSender {
    constructor(config = {}) {

        this.config = {
            url: 'http://localhost:9981/',
            ...config
        };

        this.driver = null;
        this.messageInput = null;
        this.valueInput = null;
        this.running = false;
        this.sendCount = 0;
    }

    // Function to initialize WebDriver
    async init() {
        const options = new chrome.Options()
            .addArguments(['--no-sandbox', '--disable-gpu']);

        this.driver = await new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .build();
    }

    // Selenium function to setup page and elements
    async setup() {
        await this.driver.get(this.config.url);
        await this.driver.wait(until.titleContains('ProtoPie'), 10000);
        await this.driver.wait(until.elementLocated(By.css('.message-sender')), 5000);

        this.messageInput = await this.driver.findElement(By.xpath(
            '//div[contains(@class, "message-sender")]//input[contains(@placeholder, "Message")]'
        ));
        this.valueInput = await this.driver.findElement(By.xpath(
            '//div[contains(@class, "message-sender")]//input[contains(@placeholder, "Value")]'
        ));

        // Print a ready message
        console.log('🔗 Connected with Protopie Connect Server - Ready to send data ...');
        console.log('Press Ctrl+C to stop.');
    }

    // Selenium function to clear the input field (required hack)
    async clearField(input) {
        await input.click();
        await input.sendKeys(Key.chord(Key.CONTROL, 'a'), Key.DELETE);
    }

    // Selenium function to send a single message-value pair
    async sendOnce(message, value) {
        await this.clearField(this.messageInput);
        await this.messageInput.sendKeys(message);
        await this.clearField(this.valueInput);
        await this.valueInput.sendKeys(value.toString());
        await this.valueInput.sendKeys(Key.ENTER);

        // Confirm if both fields are updated (for safe synchronization)
        await this.driver.wait(async () => {
            const msgText = await this.messageInput.getAttribute('value');
            const valText = await this.valueInput.getAttribute('value');
            return msgText === message && valText === value.toString();
        }, 1000);

        this.sendCount++;
        console.log(`📤 [${this.sendCount}] Sent "${message}" = ${value}`);
    }

    // Main sending loop
    async sendLoop() {
        this.running = true;
        while (this.running) {
            try {
                const message = msgParts[0];
                const value = msgParts[1];
                await this.sendOnce(message, value);
            } catch (err) {
                console.error('Send error:', err.message);
            }
        }
    }

    // Main function Initialize, setup, and start sending messages
    async run() {
        try {
            await this.init();
            await this.setup();
            await this.sendLoop();

            // Handle Ctrl+C gracefully
            process.on('SIGINT', () => this.stop().then(() => process.exit(0)));
        } catch (error) {
            console.error('Failed:', error.message);
            await this.stop();
        }
    }
}

// Create sender instance and run
const sender = new ProtoPieSender({ message: 'speed' });
sender.run();

// Handle Ctrl+C gracefully
process.on('SIGINT', async () => {
    console.log('\nStopping...');
    await sender.stop();
    process.exit(0);
});

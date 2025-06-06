import WebSocket from 'ws';
import { EventEmitter } from 'events';

class AgentJSImplementation extends EventEmitter {
  constructor() {
    super();
    this.name = 'agent2';
    this.setupWebSocket();
  }

  setupWebSocket() {
    // Connect to XMPP server's WebSocket endpoint
    this.ws = new WebSocket('wss://jabber.hot-chilli.net:5280/ws');

    this.ws.on('open', () => {
      console.log('Connected to XMPP server');

      // Send initial presence
      this.sendMessage({
        type: 'greeting',
        message: 'Hello from Agent.js!',
        timestamp: new Date().toISOString(),
      });
    });

    this.ws.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        this.handleMessage(data);
      } catch (error) {
        console.error('Error processing message:', error);
      }
    });

    this.ws.on('close', () => {
      console.log('Disconnected from XMPP server');
      // Try to reconnect after 5 seconds
      setTimeout(() => this.setupWebSocket(), 5000);
    });

    this.ws.on('error', (error) => {
      console.error('WebSocket error:', error);
    });
  }

  handleMessage(data) {
    console.log('Received message:', data);

    // Process the message based on type
    switch (data.type) {
      case 'greeting':
        this.handleGreeting(data);
        break;
      case 'response':
        this.handleResponse(data);
        break;
      default:
        console.log('Unknown message type:', data.type);
    }
  }

  handleGreeting(data) {
    console.log('Received greeting:', data);
    this.sendMessage({
      type: 'response',
      message: 'Greeting acknowledged by Agent.js',
      timestamp: new Date().toISOString(),
    });
  }

  handleResponse(data) {
    console.log('Received response:', data);
    // Process response as needed
  }

  sendMessage(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.warn('WebSocket is not open, message not sent:', data);
    }
  }

  start() {
    console.log('Agent.js started');
  }

  stop() {
    if (this.ws) {
      this.ws.close();
    }
    console.log('Agent.js stopped');
  }
}

// Create and start the agent
const agent = new AgentJSImplementation();
agent.start();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down Agent.js...');
  agent.stop();
  process.exit(0);
});

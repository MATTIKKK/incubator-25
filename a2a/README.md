# Multi-Agent System with A2A Protocol 🤖

This project demonstrates a multi-agent system using two different frameworks:

1. SPADE (Python)
2. Agent.js (Node.js)

The agents communicate using the Agent-to-Agent (A2A) protocol through a public XMPP server.

## Setup 🚀

### Step 1: Register XMPP Accounts

1. Visit https://jabber.hot-chilli.net/register/
2. Register two accounts:
   - agent1@jabber.hot-chilli.net (for SPADE agent)
   - agent2@jabber.hot-chilli.net (for Agent.js)
3. Remember the passwords!

### Step 2: Configure Agents

1. Update the SPADE agent credentials in `agent1/spade_agent.py`:
   - Replace `your_secure_password123` with your actual password

### Python Agent (SPADE)

1. Create and activate a virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:

```bash
pip install -r requirements.txt
```

### Node.js Agent

1. Navigate to the agent2 directory:

```bash
cd agent2
```

2. Install dependencies:

```bash
npm install
```

## Running the System 🎮

1. Start the SPADE agent (in one terminal):

```bash
python agent1/spade_agent.py
```

2. Start the Agent.js agent (in another terminal):

```bash
cd agent2
node agent.js
```

## How it Works 🔄

- Both agents connect to the jabber.hot-chilli.net XMPP server
- The SPADE agent sends periodic messages to Agent.js
- Agent.js processes messages and sends responses
- Messages include timestamps and metadata for proper handling

## Message Types 📨

1. Greeting: Initial message when agents connect
2. Response: Acknowledgment and processing results

## Stopping the System ⛔

- Use Ctrl+C to stop each agent
- Both agents handle graceful shutdown

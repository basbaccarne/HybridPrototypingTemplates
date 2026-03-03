# n8n experiments
n8n is an emerging no-low code automation environment (cfr. mental model of IFTTT) that can be ran locally.
It allows various inputs and integrations with SaaS platforms. 

### Requirements
* The local server needs to run node.js version 20 or higher -> check with ```node --version```)
* Raspi 5 can do this
* You also need npm (-> check with ```npm --version```)

### Quick install and run
```bash
npx n8n
```

### Full install
```bash
sudo npm install -g n8n
sudo n8n start
```
Before you can start, you nee dto create a username and a password

### Running the server
```bash
n8n
```
This sets up n8n at ```localhost:5678```

### General information
* Flows can be triggered manually (by selecting Execute Workflow) or by an external trigger (e.g. webhook)
* n8n uses ```Luxon``` to work with date and time, and also provides two variables for convenience: ```$now``` and ```$today```.
* Publishing means the service will run continuously.
* AI agents in n8n are represented as a node with some extra connections that have powerfull capabilties.

### Export & sharing
* You can download and import the workflow as a JSON
* This JSON does not contain passwords & credentials
* Local storage looks like this by default:
  ```
  ~/.n8n/
  ├─ database.sqlite  ← SQLite DB with all workflows
  ├─ credentials/     ← encrypted credentials JSON files
  └─ node_modules/    ← installed nodes if needed
  ```
### Learning resources
* [Basic AI agents in n8n](https://docs.n8n.io/advanced-ai/intro-tutorial/#what-you-will-learn)
* LLM vs Agent (source: see above)
  | Feature	| LLM	 |AI Agent |
  | -- | -- | -- |
  |Core Capability	|Text generation	|Goal-oriented |task completion|
  |Decision-Making	|None	|Yes|
  |Uses Tools/APIs	|No	|Yes|
  |Workflow Complexity	|Single-step	|Multi-step|
  |Scope	|Generates language	| Performs complex, real-world tasks|
  |Example	|LLM generating a paragraph|	An agent scheduling an appointment|

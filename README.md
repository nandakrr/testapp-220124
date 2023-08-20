# Workshop (Fintech Devcon)
What we are going to achieve...
## Setup

### Install Docker and Docker Compose
- [Docker Installation Guide](https://docs.docker.com/get-docker/)
- [Docker Compose Installation Guide](https://docs.docker.com/compose/install/)

### Install Postman 
(Optional)
- [Postman Installation Guide](https://www.postman.com/downloads/)

### Clone the Repo in This Specific Branch 
(Optional - needed when building from source)
- `git clone -b fintech_devcon https://github.com/ballerine-io/ballerine.git`


-----
## Running the Project

### Options:
1. **(Recommended) Download Pre-built Images from GitHub Container Registry:**
   - The images are built from the devcon branch and available in the GitHub Container Registry.
   - Use the following command to fetch and run them:
     ```bash
     docker-compose pull && docker-compose up
     ```

2. **Build Images from Source Code:**
   - You can build the images directly from the source code instead of downloading pre-built images.
   - Use the following command:
     ```bash
     docker-compose build && docker-compose up
     ```

3. **Run the Code on the Local Machine (No Docker):**
   - If you prefer to run the packages directly on your local machine without Docker, you can do so using npm.
   - Navigate to each package directory and run:
     ```bash
     npm install
     npm start
     ```

### What's Running?
- [Collection Flow](http://localhost:5201) - (`localhost:5201`)
- [Case Management](http://localhost:5137) - (`localhost:5137`)
- [Monitoring Dashboard](http://localhost:5200) - (`localhost:5200`)
- [Backend](http://localhost:3000/api) - (`localhost:3000/api`)



---

## Verifying That is up and running
#### Apps Credentials
**Username**: `admin@admin.com`
**Password**: `admin`

1. **Start with the [Collection Flow App](http://localhost:5201):**
   - Fill in the forms, submit.

2. **Seeing That the Workflow State Moved to Manual Review:**
   - Go to the [monitoring dashboard](http://localhost:5200).
   - Move to the "Workflows" tab and click "View Workflow".
   - You should see the new flow in the list, and the state should be "Manual Review."

3. **Open the [Case Management](http://localhost:5137) app:**
   - Click on the specific view that corresponds to the open case.

4. **Approving the Case in the Case Management:**
   - Within the case management view, proceed with the approval actions.

5. **Seeing the Case State as Approved in the Monitoring Dashboard:**
   - Return to the monitoring dashboard.
   - Check the updated state to verify it is marked as approved.

## Workshop Walkthrough

When everything is running, we will start the walk-through. Below are the steps to follow, and each one involves a request to change the configuration to the backend.

Flow Diagam:

### Step 1: Add Fields to the Collection Flow
We will add website and a file input.
- **cURL Request:**
    ```bash
    # Insert cURL request here
    ```
- **Postman Collection Request:** `Name_of_Postman_Request_1`

### Step 2: Add the First Plugin
The first plugin will take the custom file uploaded and will use our API to retrieve JSON by the provided JSON schema.
- **cURL Request:**
    ```bash
    # Insert cURL request here
    ```
- **Postman Collection Request:** `Name_of_Postman_Request_2`

### Step 3: Create a Rule Based on Data
We will create a rule to move either to manual review or automatic approval of the flow.
- **cURL Request:**
    ```bash
    # Insert cURL request here
    ```
- **Postman Collection Request:** `Name_of_Postman_Request_3`

### Step 4: Add the Second Plugin - Webhook Plugin
We'll add a webhook plugin and guide them through configuring a plugin to receive events from the workflow.
- **cURL Request:**
    ```bash
    # Insert cURL request here
    ```
- **Postman Collection Request:** `Name_of_Postman_Request_4`

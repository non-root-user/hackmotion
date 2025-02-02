# Hackmotion assignment

## How to Run the Apps

### Frontend (Node + Vue)

1. Navigate to the `client/` directory:
    ```sh
    cd client/
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Run the frontend application:
    ```sh
    npm run dev
    ```

### Backend (Python Flask)

Analytics backend takes in three environment variables:
IS_REVERSE_PROXY (default False) Changes the behaviour of ip address sourcing to accomodate reverse proxy usage.

IS_LOCAL_SERVER (default False) Permits all CORS sourcepoints. Should only be used when in a testing environment.

LOG_FOLDER (no default, **required**) Absolute path to a folder in which all logs are to be saved. Note that this is a folder path, not a file path, since all created logs have a standardized name of {date}.log. Thus a new file is created for every new day.

1. Navigate to the `analytics/` directory:
    ```sh
    cd analytics/
    ```

2. Create and activate a virtual environment:
    ```sh
    python3 -m venv venv
    source venv/bin/activate
    ```

3. Install the dependencies:
    ```sh
    pip install -r requirements.txt
    ```

4. Run the backend application:
    ```sh
    LOG_FOLDER=/home/user/hackmotion/logs flask run
    ```
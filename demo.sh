#!/bin/sh

# Function to start the database
start_database() {
    echo "Starting the database..."
    brew services start postgresql@16
    echo "Database started."
}

# Function to stop the database
stop_database() {
    echo "Stopping the database..."
    brew services stop postgresql@16
    echo "Database stopped."
}

# Function to run tests
run_tests() {
    echo "Running test cases..."
    sh testHealthz.sh
    echo "Test cases execution completed."
}

echo
echo "Welcome to the application setup script!"
echo
# Check if any process is running on port 3000 and kill it
PORT=3000
echo "Checking for any process running on port $PORT..."
PID=$(lsof -ti tcp:$PORT)

echo

if [ ! -z "$PID" ]; then
  echo "Found process $PID running on port $PORT. Killing it..."
  kill -9 $PID
  echo "Process on port $PORT has been terminated."
else
  echo "No process found running on port $PORT."
fi

echo

# Start application
echo "Starting the application..."
# Start the application in the background and get its PID
npm run demo &
APP_PID=$!

echo
# Wait for the application to be ready
echo "Waiting for the application to start..."
while ! nc -z localhost 3000; do   
  sleep 1 # wait for 1 second before check again
done
echo "Application started."

echo

# Main program loop
while true; do

    # Ask user for database operation
    echo "Do you want to start or stop the database? (start/stop): "
    read db_action

    if [ "$db_action" = "start" ]; then
        start_database && sleep 1 
    elif [ "$db_action" = "stop" ]; then
        stop_database
    else
        echo "Invalid input. Skipping database operation."
    fi

    echo
    # Run tests
    run_tests

    echo
    echo
    # Ask if user wants to retry steps 3 to 6
    echo "Do you want to retry the steps for starting/stopping the 
database and running tests? (yes/no): "
    read retry

    if [ "$retry" != "yes" ]; then
        echo "Exiting the program."
        kill -9 $APP_PID
        break
    fi
done

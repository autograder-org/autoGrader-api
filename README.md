# Cloud Native Web Application for User Management

[![Unit Test and Build](https://github.com/cloud-assignments-org/webapp/actions/workflows/unit-tests+build.yml/badge.svg)](https://github.com/cloud-assignments-org/webapp/actions/workflows/unit-tests+build.yml)
[![Integration Test](https://github.com/cloud-assignments-org/webapp/actions/workflows/integration-tests.yml/badge.svg)](https://github.com/cloud-assignments-org/webapp/actions/workflows/integration-tests.yml)
[![Packer CI](https://github.com/cloud-assignments-org/webapp/actions/workflows/packer-validate.yml/badge.svg)](https://github.com/cloud-assignments-org/webapp/actions/workflows/packer-validate.yml)
[![Packer image build](https://github.com/cloud-assignments-org/webapp/actions/workflows/packer-build.yml/badge.svg)](https://github.com/cloud-assignments-org/webapp/actions/workflows/packer-build.yml)
[![Rolling Update](https://github.com/cloud-assignments-org/webapp/actions/workflows/rolling-update.yml/badge.svg)](https://github.com/cloud-assignments-org/webapp/actions/workflows/rolling-update.yml)

## Project Overview

This project is a cloud-native web application that focuses on managing user accounts efficiently and securely. It leverages advanced cloud technologies and follows best practices in software development, deployment, and operations, demonstrating a deep understanding of cloud-native architecture and DevOps methodologies.

## Key Features

- **User Account Management**: Provides functionalities for creating, updating, and retrieving user account details with full security measures and data validation.
- **Automated User Verification**: Integrates with Google Cloud Pub/Sub to handle events such as sending verification emails upon account creation.
- **Structured Logging**: Utilizes JSON format for logging, ensuring that logs are easy to analyze and are systematically managed through Google Cloud Logging.
- **Event-Driven Architecture**: Makes use of Google Cloud Pub/Sub for decoupling services, which enhances the application's scalability and responsiveness.

## Technologies Used

- **CentOS Stream 8**: Chosen for its stability and robustness as a server operating system.
- **Programming Language**: NodeJS.
- **Database**: PostgreSQL, integrated within the application through TypeORM for robust data management.
- **Google Cloud Services**: Including but not limited to Google Cloud Pub/Sub, Google Cloud Functions, Google Cloud IAM, and Google Cloud Logging for comprehensive cloud functionality.

## CI/CD and DevOps Practices

The project incorporates continuous integration and continuous deployment (CI/CD) pipelines that facilitate automated testing, building, and deployment processes:

- **CI Workflows**: Automate the execution of unit and integration tests, security checks, and build processes upon each commit, ensuring that all changes meet quality standards before merging.
- **CD Workflows**: Manage the automated deployment of the application to different environments, ensuring reliable and consistent deployment practices.
- **Packer**: Used for building custom machine images that include the application and all necessary configurations, ensuring that environments are reproducible and consistent across deployments.

## Installation and Running the Application

<!-- Instructions here detail how to set up your local development environment, configure necessary cloud services, and deploy the application both locally and on cloud platforms. -->
- **Set up Node and npm**
- **Install Dependencies** : `npm i`
- **Set up Local Instance of PostgreSQL** : 
    - Copy the file `.env.sample` to `.env.development`
    - Set up local instance of PostgreSQL 
    - Run the following commands to set up the required users and tables within the Database Instance        
      1. `CREATE DATABASE autograder;`
      2.   `CREATE USER autograder WITH SUPERUSER ENCRYPTED PASSWORD 'autograder';`
- **Build the project and run tests**: `npm run build`
- **Run the api server** : `npm run dev`
- **Access API Specs** : Open browser and visit `http://localhost:3000/api-docs/` to have a look at the API end points

## Contributing

<!-- Guidelines for how contributors can get involved, propose changes, submit patches, and report bugs. -->

## License

[MIT Lisence](https://github.com/cloud-assignments-org/webapp/blob/main/LISENCE.md)

## Contact Information
- **Name**: Dhruv Parthasarathy
- **Email**: [parthasarathy.d@northeastern.edu](mailto:parthasarathy.d@northeastern.edu)
- **LinkedIn**: [linkedin.com/in/parthasarathydhruv](https://www.linkedin.com/in/parthasarathydhruv/)

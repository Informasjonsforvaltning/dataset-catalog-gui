# Dataset Catalog GUI

## Description

An application for managing datasets.

## Installation and Usage

- Required tools to run this project:
  - Node.js and npm to run locally on a host machine
  - Docker and Docker Compose to run locally in a container

#### Running application locally on a host machine

- Install dependencies by running `npm install`
- Run `npm start` to start local development server

#### Running application in a Docker container

- Build a Docker container using the following command:
  - `docker build -t account-web .`
- Run the container using the following comand:
  - `docker run -d -p 4301:8080 -e NAMESPACE -e FDK_BASE_URI -e SSO_HOST -e SKE_THEME_PROFILE -e FDK_REGISTRATION_BASE_URI -e REGISTRATION_API_HOST -e ADMIN_GUI_BASE_URI -e ORGANIZATION_API_HOST -e SEARCH_FULLTEXT_HOST -e DATASERVICE_CATALOG_BASE_URI -e CONCEPT_REGISTRATION_HOST -e CONCEPT_REGISTRATION_API_HOST -e RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI -e RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI dataset-catalog-gui`

#### Running application using Docker Compose

- Run the application using the following command:
  - `docker-compose up -d`

## Environment Variables

- `NAMESPACE` - Environment namespace
  - `development`
  - `staging`
  - `demo`
  - `prod`
- `FDK_BASE_URI` - FDK base URI
- `SSO_HOST` - SSO hostname
- `SKE_THEME_PROFILE` - comma-separated list of organization numbers
- `FDK_REGISTRATION_BASE_URI` - FDK registration GUI base URI
- `REGISTRATION_API_HOST` - FDK registration API hostname
- `ADMIN_GUI_BASE_URI` - FDK admin GUI base URI
- `ORGANIZATION_API_HOST` - FDK organization catalog API hostname
- `SEARCH_FULLTEXT_HOST` - FDK full-text search API hostname
- `DATASERVICE_CATALOG_BASE_URI` - FDK data service catalog GUI base URI
- `CONCEPT_REGISTRATION_HOST` - FDK concept registration GUI hostname
- `CONCEPT_REGISTRATION_API_HOST` - FDK concept registration API hostname
- `RECORDS_OF_PROCESSING_ACTIVITIES_GUI_BASE_URI` - FDK records of processing activities GUI base URI
- `RECORDS_OF_PROCESSING_ACTIVITIES_API_BASE_URI` - FDK records of processing activities API base URI

## Contributing

#### Branching Strategy

Whenever a new change is to be implemented, follow these steps:

- Create a new branch from the master branch
- Implement and commit changes
- Create a pull request for code review

#### Commits

This repository uses conventional commmit format. In order to commit, follow these steps:

- Stage files to be committed
- Run `npm run commit` script

Do not use `--no-verify` flag when making commits.

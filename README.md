# Dataset Catalog GUI

> ⚠️ **This repository is in maintenance mode.**
> This codebase is still in use in production but is no longer receiving new features. All development efforts are
> being migrated to [catalog-frontend](https://github.com/Informasjonsforvaltning/catalog-frontend). Critical bug fixes will
> still be applied until migration is complete.

Web frontend for dataset catalog. Only the dataset form page is used. This application is part of the
[registration solutions](https://catalog-portal.fellesdatakatalog.digdir.no/).

For a broader understanding of the system’s context, refer to the [architecture documentation](https://github.com/Informasjonsforvaltning/architecture-documentation) wiki. For more specific
context on this application, see the [Registration](https://github.com/Informasjonsforvaltning/architecture-documentation/wiki/Architecture-documentation#registration) subsystem section.

## Getting started

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) >=18.16
- [npm](https://www.npmjs.com/get-npm) >=10.2.3
- [Docker](https://www.docker.com/get-started)
- [docker-compose](https://docs.docker.com/compose/install/)

### Running locally (development)

Clone the repository:

```bash
git clone https://github.com/Informasjonsforvaltning/dataset-catalog-gui.git
cd dataset-catalog-gui
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run start
```

Go to http://localhost:8080

### Run locally using docker compose
```bash
docker compose up -d --build
```

Go to http://localhost:4301

### Running the storybook
To get an overview of the react components used in this app, run:
```shell
npm run storybook
```

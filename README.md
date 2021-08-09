[![MIT License][license-shield]][license-url]
[![pipeline status][pipeline-shield]][pipeline-url]

# takehome-addresses

## Table of Contents

- [takehome-addresses](#takehome-addresses)
  - [Table of Contents](#table-of-contents)
  - [About](#about)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Tests](#tests)
  - [Contributing](#contributing)
  - [License](#license)
  - [Credits](#credits)
  - [Productionification Thoughts](#productionification-thoughts)
  - [What I've learned](#what-ive-learned)
  - [Things I would add/change with more time](#things-i-would-addchange-with-more-time)

---

## About

**takehome-addresses** is a an example REST API developed with Docker, Node.js, PostgreSQL, and Knex.js.

See [Test Driven Development with Node, Postgres, and Knex (Red/Green/Refactor)][mherman] by Michael Herman for details.

Dockerized with the help of Bret Fisher's [node-docker-good-defaults][nodedockerdefaults].

Modified by Max Howard for a special use case.

## Installation

1. You'll need [Docker and docker-compose][dc].

```bash
$ git clone git@github.com:Astrovicis/takehome.git && cd takehome
```

2. Build Docker containers locally:

```bash
$ docker-compose up -d --build
```

3. Run migrations & seed:

```bash
$ docker-compose exec node_app knex migrate:latest --env development
$ docker-compose exec node_app knex migrate:latest --env test
$ docker-compose exec node_app knex seed:run --env development
$ docker-compose exec node_app knex seed:run --env test
```

## Usage

```bash
docker-compose up -d
```

Go to `http://localhost` to see the Express app.

## Tests

After you've spun up the container:

```bash
docker-compose exec node_app mocha --exit
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](LICENSE)

## Credits

- [Michael Herman][mherman]
- [Bret Fisher][nodedockerdefaults]
- [Max Howard][astrovicis]

[astrovicis]: https://github.com/astrovicis
[dc]: https://docs.docker.com/compose/
[mherman]: https://mherman.org/blog/test-driven-development-with-node/
[nodedockerdefaults]: https://github.com/BretFisher/node-docker-good-defaults
[license-shield]: https://img.shields.io/github/license/sophiabrandt/tdd-node-shows.svg?style=flat-square
[license-url]: https://github.com/sophiabrandt/tdd-node-shows/blob/master/LICENSE
[pipeline-shield]: https://gitlab.com/sophiabrandt/tdd-node-shows/badges/master/pipeline.svg?style=flat-square
[pipeline-url]: https://gitlab.com/sophiabrandt/tdd-node-shows/-/commits/master

## Productionification Thoughts

- [docker-compose scale][scale]
- [Amazon ECS Applications via Docker Compose][deploy-compose]

[deploy-compose]: https://aws.amazon.com/blogs/containers/deploy-applications-on-amazon-ecs-using-docker-compose/
[scale]: https://docs.docker.com/compose/reference/scale/

## What I've learned
- Docker compose is really useful
- Null prototype objects should be null prototype objects as the req.body
- Joi is great and I miss it

## Things I would add/change with more time
- Add Joi validation
- Change db/queries.js to services/addresses.js
- Make more secure the postgres container (nondefault passwords), especially with open port
- De-hardcode the table columns queried by getMatching, whether with objection or knex
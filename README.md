# RG Gammification Dashboard

Provide gammification dashboard pages.

1. [Configuration](#configuration)
    - [Setup a development environment](#setup-a-development-environment)
        - [Installing the plugin](#installing-the-plugin)
        - [Frontend development (React)](#frontend-development-react)
        - [Backend development](#backend-development)
        - [Build distribution package](#build-distribution-package)

# Configuraiton

# Setup a development environment

## Installing the plugin
PREREQUISITES: A running local edx instance with Gamma integration setup & enabled

1. Clone edx-gamma-dashboard repository
2. Go to your `devstack` repository directory & symlink the directory where `edx-gamma-dashboard` repository resides to the root, e.g.:
```bash
$ ln -s /path/to/edx-gamma-dashboard/ ./
```

3. Modify your docker-compose.yml file to mount `edx-gamma-dashboard` directory to your lms container as a volume, e.g.:

`docker-composer.yml`:
```
    ...

    lms:
        ...
        volumes:
            - ./edx-gamma-dashboard:/edx/var/edxapp/edx-gamma-dashboard
    ...
```

4. Bring up your edx devstack environment & make sure you have a directory with `edx-gamma-dashboard` repository contents at the place you've mounted it to, in our case it's `/edx/var/edxapp/edx-gamma-dashboard`:
```
$ make dev.up
$ make lms-shell

lms-docker-container $ ls /edx/var/edxapp/edx-gamma-dashboard
```

5. Inside the lms container install the package in edit mode:
```
devstack$ make lms-shell
lms-container$ source /edx/app/edxapp/edxapp_env
lms-container$ install -e /edx/var/edxapp/edx-gamma-dashboard
```

6. You're good to go.

## Frontend development (React)
1. To install all necessary dependencies simply run:
```
$ make install-react-deps
```
2. To make a development build:
```
$ make build
```
3. To start development build-watch loop:
```
$ make build-watch
```
4. To make a production build:
```
$ make build-prod
```
5. To run react tests:
```
$ make jest
```
6. To run react test-watch loop:
```
$ make jest-watch
```
7. To run tests in verbose mode (useful for debugging):
```
$ make jest-v
```
8. To run test-watch in verbose mode (useful for debugging):
```
$ make jest-watch-v
```

## Backend development
1. To see changes in edx, you should restart your lms server, e.g.:
```
devstack$ make lms-restart
```
2. To run tests:
```
$ make test
```
3. To run tests in verbose mode (good for debugging):
```
$ make test-v
```


## Build distribution package
!TODO
1. Instructions to build python package for production
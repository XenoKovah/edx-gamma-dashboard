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
lms-container$ pip install -e /edx/var/edxapp/edx-gamma-dashboard
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

## Nix
1. Install nix
```
sh <(curl -L https://nixos.org/nix/install) --daemon
```
2. Activate development environment (OPTIONAL in case of direnv)
```
make nix-shell
```
3. Check versions
```
python --version
```
```
node -v && npm -v
```
4. Build frontend
```
make install-react-deps
```
```
make build
```

### Using direnv
1. Install direnv
2. Add .envrc
```
echo "export NIXPKGS_ALLOW_INSECURE=1" > .envrc
echo "use flake . --impure" >> .envrc
```
3. Allow direnv
```
direnv allow
```

## Build distribution package
!TODO
1. Instructions to build python package for production

## Localization and Translations (React)

This project uses **React Intl** for managing translations and localization. It provides a flexible way to handle multiple languages and ensures that your app can easily adapt to different regions and cultures.

### Functionality

- **Translation Files**: Translations are stored in separate JavaScript files, organized by language (e.g., `en/index.js`, `fr/index.js`).
- **Text Keys**: Each piece of text has a unique key and an associated default value. This allows for easy reference and translation.
- **Dynamic Language Switching**: You can switch between languages dynamically in the application.
- **Fallback Mechanism**: If a translation for the current language is missing, the default English text will be used.

### How to Use Translations

You can use translations in two main ways:

1. **Using `getTranslate()` Helper**  
   The `getTranslate` function allows you to retrieve translations dynamically. You can pass the translation key as a parameter and it will return the appropriate translated string.
   ```javascript
   import { getTranslate } from './utils/getTranslate';

   const translatedText = getTranslate('header.main.title');
   // Example: returns "Welcome to the project" for English or the translation in the current language

2. **Using `<FormattedMessage />`**  
   Alternatively, you can use the <FormattedMessage /> component to directly display translated text in your JSX.
   ```javascript
   import { FormattedMessage } from 'react-intl';

   const Header = () => (
     <h1>
       <FormattedMessage id="header.main.title" defaultMessage="Welcome to the project" />
     </h1>
   );

### Styling Guidelines

This application is embedded within the edX ecosystem, inheriting styles from both the legacy edX styles and the **Paragon** component library. As such, the application's styling is a combination of these inherited designs and custom theming.

#### Theming

Custom theming for colors, fonts, and other design elements is implemented using the **legacy theme**. This is achieved by overriding CSS variables prefixed with `--rgg`.

#### CSS Variables

A comprehensive list of available CSS variables for customization can be found in the following files:

- `gamma_dashboard/static/dashboard/js/app/src/assets/scss/_variables.scss`
- `gamma_dashboard/static/dashboard/js/app/src/constants.js`

Ensure that all styling adjustments are compatible with both the legacy edX styles and the Paragon library to maintain a cohesive design.

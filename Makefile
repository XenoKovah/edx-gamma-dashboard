CURRENT_DIR = $(shell pwd)
REACT_APP_PATH = "${CURRENT_DIR}/gamma_dashboard/static/dashboard/js/app"

#
# React application
#

.PHONY: build build-watch build-prod install-react-deps \
		jest jest-v jest-watch jest-watch-v \
		test test-v nix-shell lint-js lint-styles

build:	# build development bundle
	npm run build --prefix ${REACT_APP_PATH}

build-watch: # build & watch for rebuild on changes
	npm run build-watch --prefix ${REACT_APP_PATH}

build-prod: # build production bundle
	npm run build-prod --prefix ${REACT_APP_PATH}

install-react-deps:
	npm install --prefix ${REACT_APP_PATH}

install-react-deps-ci:
	npm ci --prefix ${REACT_APP_PATH}

jest: # run react tests
	npm run test --prefix ${REACT_APP_PATH}

jest-v:	# run react tests in verbose mode
	npm run test-v --prefix ${REACT_APP_PATH}

jest-watch: # run react tests and watch for rerun on changes
	npm run test-watch --prefix ${REACT_APP_PATH}

jest-watch-v: # run react tets and watch for rerun on changes (verbose mode)
	npm run test-watch-v --prefix ${REACT_APP_PATH}

jest-cov: # run react tests with coverage report
	npm run coverage --prefix ${REACT_APP_PATH}

lint-js: # run react js linter
	npm run lint-js --prefix ${REACT_APP_PATH}

lint-styles: # run react styles linter
	npm run lint-styles --prefix ${REACT_APP_PATH}

#
# Django backend
#

test: # run tests
	python -m "pytest"

test-v:	# run tests in verbose mode (for debuging)
	python -m "pytest" -sv

test-wo-edx: # do not run tests depend on edX infrastructure
	python -m "pytest" --ignore=tests/unit/leaderboard/api/test_views.py

#
# PyPi build and publish
#
.build-pypi:
	python setup.py sdist bdist_wheel

pypi: build-prod .build-pypi
	TWINE_PASSWORD=${CI_JOB_TOKEN} TWINE_USERNAME=gitlab-ci-token python -m twine upload --repository-url https://gitlab.raccoongang.com/api/v4/projects/${CI_PROJECT_ID}/packages/pypi dist/*

#
# Nix support
#
nix-shell:
	NIXPKGS_ALLOW_INSECURE=1 nix develop --impure

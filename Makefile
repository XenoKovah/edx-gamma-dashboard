CURRENT_DIR = $(shell pwd)
REACT_APP_PATH = "${CURRENT_DIR}/gamma_dashboard/static/leaderboard/js/app"

#
# React application
#

.PHONY: build

build:	# build development bundle
	npm run build --prefix ${REACT_APP_PATH}

build-watch: # build & watch for rebuild on changes
	npm run build-watch --prefix ${REACT_APP_PATH}

build-prod: # build production bundle
	npm run build-prod --prefix ${REACT_APP_PATH}

test:	# run tests
	python -m "pytest"

test-v:	# run tests in verbose mode (for debuging)
	python -m "pytest" -sv

install-react-deps:
	npm install --prefix ${REACT_APP_PATH}

jest:	# run react tests
	npm run test --prefix ${REACT_APP_PATH}

jest-v:	# run react tests in verbose mode
	npm run test-v --prefix ${REACT_APP_PATH}

jest-watch: # run react tets and watch for rerun on changes
	npm run test-watch --prefix ${REACT_APP_PATH}

jest-watch-v: # run react tets and watch for rerun on changes (verbose mode)
	npm run test-watch-v --prefix ${REACT_APP_PATH}

CURRENT_DIR = $(shell pwd)
REACT_APP_PATH = "${CURRENT_DIR}/gamma_dashboard/static/leaderboard/js/app"

#
# React application
#

build:	# build a development bundle
	npm run build --prefix ${REACT_APP_PATH}

build-watch: # build & watch for rebuild on changes
	npm run build-watch --prefix ${REACT_APP_PATH}

build-prod: # build a production bundle
	npm run build-prod --prefix ${REACT_APP_PATH}

#
#
#    \’  Interactive Things
#    /\  Road to School
#
#
SHELL := /bin/bash
PATH  := node_modules/.bin:$(PATH)

CLI_IXT_BLUE = \033[38;5;67m
CLI_SUCCESS  = \033[1;32m✔
CLI_NOTICE   = \033[1;36m→
CLI_RESET    = \033[0m

BUILD_DIR := build/
DEPLOY_CMD := rsync -avz --delete --exclude-from=.rsyncexclude $(BUILD_DIR) interact@interactivethings.com:/home/interact/www/lab.interactivethings.com/road-to-school
DEPLOY_URL := https://lab.interactivethings.com/road-to-school


#
# Standard targets
#

.PHONY: all install server build deploy clean clobber

all: server

install: node_modules

server: _banner install
	npm start

build: install
	npm run build

node_modules: package.json
	npm install
	@touch -fc $@

clean:
	rm -rf $(BUILD_DIR)

clobber:
	git clean -dfx \
	  -e .node-version


#
# Preconditions
#

.PHONY: _banner

_banner:
	@echo -e "$(CLI_IXT_BLUE)\n"
	@echo "    \\’  Interactive Things"
	@echo "    /\\  Road to School"
	@echo -e "$(CLI_RESET)\n"

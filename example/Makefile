.PHONY: bootstrap build serve serve-dist

slb=../bin/slb-dev
bin=./node_modules/.bin

bootstrap:
	npm install

build:
	$(slb) build ./src/index.js dist/bundle.js

serve:
	$(slb) serve ./src/index.js dist/bundle.js

serve-dist:
	$(bin)/http-server dist

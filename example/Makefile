.PHONY: bootstrap bundle bundle-dev serve

slb=../bin/slb-dev
bin=./node_modules/.bin

bootstrap:
	npm install

bundle:
	$(slb) bundle ./src/index.js ./dist/bundle.js

bundle-dev:
	$(slb) bundle --dev --base ./dist ./src/index.js ./dist/bundle.js

serve:
	$(bin)/http-server dist

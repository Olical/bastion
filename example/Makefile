.PHONY: bootstrap bundle bundle-dev check serve

bastion=../bin/bastion-dev
bin=./node_modules/.bin

bootstrap:
	npm install

bundle:
	$(bastion) bundle ./src/index.js ./dist/bundle.js

bundle-dev:
	$(bastion) bundle --dev --base ./dist ./src/index.js ./dist/bundle.js

check:
	$(bastion) check "./src/**.js"

serve:
	$(bin)/http-server dist

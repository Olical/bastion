.PHONY: default bootstrap lint

bin=./node_modules/.bin

default: bootstrap lint

bootstrap:
	npm install

lint:
	$(bin)/standard "./src/**/*.js" "./bin/*"

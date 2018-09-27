.PHONY: install-deps
install-deps:
	docker-compose run --rm app npm install

.PHONY: load-fixtures
load-fixtures:
	docker-compose run --rm app npm run fixtures

.PHONY: start
start:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose down

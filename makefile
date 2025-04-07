# Makefile
# -----------
# Ce Makefile fournit des commandes pour gérer vos services via Docker Compose.
# Utilisez "make dev" pour lancer tous vos services avec un build préalable.

SHELL := /bin/bash

up:
	docker compose up --build -d

front:
	docker compose up --build -d backend
db:
	docker compose up  --build -d mongodb
back:
	docker compose up  --build -d backend
	   
logs:
	docker compose logs -f

down:
	docker-compose down

config:
	docker-compose config

local:
	docker compose -f docker-compose.dev.yml up --build -d

local-down:
	docker compose -f docker-compose.dev.yml down

local-logs:
	docker compose -f docker-compose.dev.yml logs -f

local-config:
	docker compose -f docker-compose.dev.yml config

local-build:
	docker compose -f docker-compose.dev.yml build

# Makefile
# -----------
# Ce Makefile fournit des commandes pour gérer vos services via Docker Compose.
# Utilisez "make dev" pour lancer tous vos services avec un build préalable.
# Utilisez "make preprod" pour l'environnement pré-production.
# Utilisez "make prod" pour l'environnement de production.

SHELL := /bin/bash

# Lancer l'environnement de production avec un build préalable
up-prod:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d

# Lancer l'environnement de pré-production avec un build préalable
up-preprod:
	docker-compose -f docker-compose.yml -f docker-compose.preprod.yml build
	docker-compose -f docker-compose.yml -f docker-compose.preprod.yml up -d

# Lancer l'environnement de développement avec un build préalable
up-dev:
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml build
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Lancer uniquement le frontend en développement
front-dev:
	docker compose -f docker-compose.dev.yml up --build -d frontend

# Lancer uniquement la base de données (mongodb) en développement
db-dev:
	docker compose -f docker-compose.dev.yml up --build -d mongodb

# Lancer uniquement le backend en développement
back-dev:
	docker compose -f docker-compose.dev.yml up --build -d backend

# Voir les logs en temps réel de tous les services (dev, preprod, prod)
logs:
	docker-compose logs -f

# Arrêter et supprimer tous les services (dev, preprod, prod)
down:
	docker-compose down

# Vérifier la configuration du Docker Compose (dev, preprod, prod)
config:
	docker-compose config

# Lancer l'environnement de développement local avec un build préalable
local:
	docker compose -f docker-compose.dev.yml up --build -d

# Arrêter et supprimer tous les services en local (dev)
local-down:
	docker compose -f docker-compose.dev.yml down

# Voir les logs en temps réel des services en local (dev)
local-logs:
	docker compose -f docker-compose.dev.yml logs -f

# Vérifier la configuration du Docker Compose en local (dev)
local-config:
	docker compose -f docker-compose.dev.yml config

# Effectuer un build des services en local (dev)
local-build:
	docker compose -f docker-compose.dev.yml build

# Lancer l'environnement de pré-production sans mode détaché
preprod-no-detach:
	docker-compose -f docker-compose.yml -f docker-compose.preprod.yml build
	docker-compose -f docker-compose.yml -f docker-compose.preprod.yml up

# Lancer l'environnement de production sans mode détaché
prod-no-detach:
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml build
	docker-compose -f docker-compose.yml -f docker-compose.prod.yml up

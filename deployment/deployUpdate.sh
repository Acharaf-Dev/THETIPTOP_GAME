#!/bin/bash

set -e  # Stoppe le script en cas d'erreur
set -o pipefail

echo "🔄 Déploiement TipTop en cours..."

DEPLOY_DIR="/opt/deploy-thetiptop"

if [ ! -d "$DEPLOY_DIR" ]; then
    echo "❌ Répertoire ${DEPLOY_DIR} introuvable"
    exit 1
fi

cd "$DEPLOY_DIR"

echo "📦 Pull des dernières images..."
docker-compose pull || { echo '❌ Échec du pull'; exit 1; }

echo "🚀 Mise à jour des services..."
docker-compose up -d || { echo '❌ Échec du redémarrage des containers'; exit 1; }

echo "🧹 Nettoyage Docker (images non utilisées)..."
docker image prune -f

echo "✅ Déploiement terminé avec succès."
echo "📅 Dernière mise à jour : $(date)"
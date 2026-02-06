#!/bin/bash

# Lancer le serveur Laravel avec des limites d'upload très élevées (2GB)
# Utile pour le développement local avec de gros fichiers (photos, zips)

echo "🚀 Démarrage du serveur de développement avec limites étendues..."
echo "📦 Upload Max: 51200M"
echo "📮 Post Max: 51200M"
echo "🧠 Memory Limit: 51200M"
echo "⏱️ Max Execution Time: 300s"

php -d upload_max_filesize=51200M \
    -d post_max_size=51200M \
    -d memory_limit=51200M \
    -d max_execution_time=300 \
    -d max_file_uploads=100 \
    artisan serve

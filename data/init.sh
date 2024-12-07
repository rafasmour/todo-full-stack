#!/bin/bash
set -e

# Load required environment variables
export $(grep -E '^(DATABASE_ROOT_USER|DATABASE_ROOT_PASS|DATABASE_ROOT_DATABASE|MONGODB_USER|MONGODB_PASS|MONGODB_DB)=' /docker-entrypoint-initdb.d/.env)

# Create the root user in the admin database
mongosh <<EOF
use admin
db.createUser({
  user: '$DATABASE_ROOT_USER',
  pwd: '$DATABASE_ROOT_PASS',
  roles: [ { role: "root", db: "admin" } ]
})
EOF

# Create the application user in the target database
mongosh <<EOF
use $DATABASE_DB
db.createUser({
  user: '$MONGODB_USER',
  pwd: '$MONGODB_PASS',
  roles: [ { role: "readWrite", db: "$DATABASE_DB" } ]
})
EOF
#!/bin/bash
set -e

# Load required environment variables
export $(grep -E "^(DATABASE_ROOT_USER|DATABASE_ROOT_PASS|DATABASE_ROOT_DATABASE|DATABASE_USER|DATABASE_PASS|DATABASE_DB)=" /docker-entrypoint-initdb.d/.env)

# Create the root user in the admin database
mongosh <<EOF
use admin
db.createUser({
  user: "$DATABASE_ROOT_USER",
  pwd: "$DATABASE_ROOT_PASS",
  roles: [ { role: "root", db: "admin" } ]
})
EOF

# Create the application user in the target database
mongosh <<EOF
use $DATABASE_DB
db.createUser({
  user: "$DATABASE_USER",
  pwd: "$DATABASE_PASS",
  roles: [ { role: "readWrite", db: "$DATABASE_DB" } ]
})
EOF

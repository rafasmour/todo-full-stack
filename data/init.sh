# init.sh
set -e
mongosh -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<EOF
use $MONGO_INITDB_DATABASE
use admin
db.createUser({
  user: '$MONGODB_USER',
  pwd:  '$MONGODB_PASS',
  roles: [{
    role: 'readWrite',
    db: '$MONGODB_DB'
  }]
})
EOF
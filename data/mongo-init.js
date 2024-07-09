print("Started Adding the Users.");
db = db.getSiblingDB("admin");
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "admin" }],
});
print("End Adding the User Roles.");
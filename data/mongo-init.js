print("Started Adding the Users.");
db = db.getSiblingDB("admin");
db.createUser({
  user: "admin",
  pwd: "admin",
  roles: [{ role: "readWrite", db: "admin" }],
});
db.createUser({
  user: "nest",
  pwd: "nest",
  roles: [{ role: "readWrite", db: "todo" }],
});
print("End Adding the User Roles.");
import Database from "nedb";

export const users = new Database("./data/users.db");
users.loadDatabase();

export const friends = new Database("./data/friends.db");
friends.loadDatabase();
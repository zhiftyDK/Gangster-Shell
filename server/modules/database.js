import Database from "nedb";

export const users = new Database("./data/users.db");
users.loadDatabase();
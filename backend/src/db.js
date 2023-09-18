import { MongoClient, Db, ObjectId } from "mongodb";

/**
 * @type MongoClient | null
 */
let client = null;

/**
 * @type Db | null
 */
export let db = null;

const COLLECTIONS = {
  USERS: "users",
};

export async function connectDB() {
  try {
    const databaseURL = process.env.DB_URL ?? "mongodb://127.0.0.1:27017";
    console.log("INFO: DB: Trying to connect to", databaseURL);
    client = new MongoClient(databaseURL);
    await client.connect();
    db = client.db("authentication-app");
    console.log("INFO: DB: Successfully connected.");
  } catch (e) {
    console.log("ERROR: DB: Unable to connect!\n", e);
    process.exit(1);
  }
}

export async function disconnectDB() {
  await client.close();
  client = null;
  db = null;
  console.log("INFO: DB: Connection closed.");
}

export async function createUser(user) {
  const { insertedId: userID } = await db
    .collection(COLLECTIONS.USERS)
    .insertOne(user);
  const createdUser = {
    ...user,
    id: userID,
  };
  return createdUser;
}

export async function updateUser(userId, fieldsToUpdate) {
  const user = await db.collection(COLLECTIONS.USERS).findOneAndUpdate(
    { _id: new ObjectId(userId) },
    {
      $set: fieldsToUpdate,
    },
    { returnDocument: "after" }
  );
  if (user) {
    user.id = user._id;
    delete user._id;
  }
  return user;
}

/**
 *
 * @param {string} id
 */
export async function findUserById(id) {
  const user = await db
    .collection(COLLECTIONS.USERS)
    .findOne({ _id: new ObjectId(id) });
  if (user) {
    user.id = user._id;
    delete user._id;
  }
  return user;
}

/**
 *
 * @param {string} email
 */
export async function findUserByEmail(email) {
  const user = await db.collection(COLLECTIONS.USERS).findOne({ email });
  if (user) {
    user.id = user._id;
    delete user._id;
  }
  return user;
}

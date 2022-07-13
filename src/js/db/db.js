import { MongoClient } from "mongodb";

let client;
let db;
let collection;

const URI =
  "mongodb+srv://anhvungoc21:fakahrina03@mycluster.xcjql.mongodb.net/?retryWrites=true&w=majority";

const connectToDB = async () => {
  client = new MongoClient(URI);
  await client.connect();
  db = client.db("2048++");
  collection = db.collection("accounts");
};

export const getAccount = async (email) => {
  try {
    await connectToDB();
    const account = await collection.find({ email: email }).toArray();
    if (account.length == 0) {
      // Account not found
      return null;
    } else if (account.length == 1) {
      // Account found
      return account.at(0);
    }
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await client.close();
  }
};

export const createAccount = async (email, password) => {
  try {
    await connectToDB();
    await collection.insertOne({ email: email, password: password });
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await client.close();
  }
};

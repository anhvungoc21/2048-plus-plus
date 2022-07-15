<<<<<<< HEAD
// import { MongoClient } from "mongodb";

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
=======
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

let ddbClient;
const awsConfig = {};

const connectToDDB = async () => {
  try {
    ddbClient = new DynamoDBClient({
      credentials: {
        accessKeyId: "AKIATIH5SGOU3U2FTWEP",
        secretAccessKey: "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",
      },
      region: "us-east-1",
    });
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const getAccount = async (email) => {
  const params = {
    TableName: "2048PlusPlus",
    Key: marshall({ email: email }),
  };

  try {
    connectToDDB();
    const res = await ddbClient.send(new GetItemCommand(params));
    const item = unmarshall(res.Item);
    console.log(item);
  } catch (err) {
    console.log(err);
    throw err;
>>>>>>> 3edb6de58669b141d09f20f0d377a44601a3a309
  }
};

export const createAccount = async (email, password) => {
  try {
<<<<<<< HEAD
    await connectToDB();
    await collection.insertOne({ email: email, password: password });
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    await client.close();
=======
  } catch (err) {
    console.log(err);
    throw err;
>>>>>>> 3edb6de58669b141d09f20f0d377a44601a3a309
  }
};

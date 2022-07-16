import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

let ddbClient;
const credentials = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
};

const connectToDDB = async () => {
  try {
    ddbClient = new DynamoDBClient({
      credentials: credentials,
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
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export const createAccount = async (email, password) => {
  try {
  } catch (err) {
    console.log(err);
    throw err;
  }
};

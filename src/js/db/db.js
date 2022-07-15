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
  }
};

export const createAccount = async (email, password) => {
  try {
  } catch (err) {
    console.log(err);
    throw err;
  }
};

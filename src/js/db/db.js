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

/**
 * Get account information from DynamoDB
 * @param {*} email
 * @returns An object with entries: email, password, userName, bestScore, settings{colorTheme, darkMode, gridSize}, gamesPlayed{total, 4x4, 5x5, 6x6}
 */
export const getAccount = async (email) => {
  const params = {
    TableName: "2048PlusPlus",
    Key: marshall({ email: email }),
  };

  await connectToDDB();
  const res = await ddbClient.send(new GetItemCommand(params));
  if (res.Item == undefined) {
    return null;
  } else {
    const item = unmarshall(res.Item);
    console.log(item);
    return item;
  }
};

export const createAccount = async (userName, email, password) => {
  const bestScoreLocal = parseInt(
    window.localStorage.getItem("bestScore2048++")
  );
  const settingsLocal = window.localStorage.getItem("settings2048++");

  const params = {
    TableName: "2048PlusPlus",
    Item: marshall({
      userName: userName,
      email: email,
      password: password,
      gamesPlayed: {
        "4x4": 0,
        "5x5": 0,
        "6x6": 0,
      },
      bestScore: bestScoreLocal,
      settings: settingsLocal,
    }),
  };

  try {
    await connectToDDB();
    const res = await ddbClient.send(new PutItemCommand(params));
    console.log(res);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// TODO: For both changing passwords and updating new best score.
export const updateAccount = async (userName, email, password) => {};

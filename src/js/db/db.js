import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
} from "@aws-sdk/client-dynamodb";
import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { marshall, unmarshall } from "@aws-sdk/util-dynamodb";

let ddbClient;
let lambdaClient;
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
 * @returns An object with entries: email, password, userName, bestScore, settings{colorTheme, darkMode, gridSize, sounds, music}, gamesPlayed{total, 4x4, 5x5, 6x6}
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
    return item;
  }
};

export const createAccount = async (userName, email, password) => {
  const bestScoreLocal = parseInt(
    window.localStorage.getItem("bestScore2048++")
  );
  const settingsLocal = JSON.parse(
    window.localStorage.getItem("settings2048++")
  );

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

  console.log(params);

  try {
    await connectToDDB();
    const res = await ddbClient.send(new PutItemCommand(params));
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// Asynchronously invokes an AWS Lambda to update DynamoDB
const invokeAsyncLambda = (payload) => {
  const funcName = `${process.env.LAMBDA_FUNC_NAME}`;
  lambdaClient = new LambdaClient({
    credentials: credentials,
    region: "us-east-1",
  });

  const params = {
    FunctionName: funcName,
    InvocationType: "Event",
    Payload: payload,
  };

  lambdaClient.send(new InvokeCommand(params));
};

export const updateAccount = (accountObj) => {
  const payload = JSON.stringify(accountObj);
  invokeAsyncLambda(payload);
};

//////////////////////////////////////////////////////////

/* DYNAMODB TABLE FORMAT */
/*
{
  "email": {
    "S": ""
  },
  "userName": {
    "S": ""
  }
  "password": {
    "S": ""
  },
  "bestScore": {
    "N": ""
  },
  "gamesPlayed": {
    "M": {
      "4x4": {
        "N": ""
      },
      "5x5": {
        "N": ""
      },
      "6x6": {
        "N": ""
      },
      "total": {
        "N": ""
      }
    }
  },
  "settings": {
    "M": {
      "colorTheme": {
        "S": ""
      },
      "darkMode": {
        "S": ""
      },
      "gridSize": {
        "N": ""
      }
      "sounds": {
        "BOOL": true/false
      }, 
    }
  },
} 
*/

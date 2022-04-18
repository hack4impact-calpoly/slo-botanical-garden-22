import { ConsoleLogger } from "@aws-amplify/core";

const AWS = require("aws-sdk");

const configuration = {
  region: "us-east-1",
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  accessKeyId: process.env.REACT_APP_SECRET_ACCESS_ID,
};

AWS.config.update(configuration);

const docClient = new AWS.DynamoDB.DocumentClient();

export const getRandomId = () => (Math.random() * Date.now()).toString(36);

// Grab all data from a table
//  tableName: admin_announcements | users | hoursLog
export const fetchData = async (tableName) => {
  var params = { TableName: tableName };

  const entries = await new Promise((resolve, reject) => {
    docClient.scan(params, function (err, data) {
      if (err) reject(err);
      else resolve(data.Items);
    });
  });

  return entries;
};

export const fetchUser = async (tableName, user) => {
  const person = "kennar12";
  console.log(person.user);
  var params = {
    Key: {
      username: person,
    },
    TableName: tableName,
  };
  console.log(user);
  const entries = await new Promise((resolve, reject) => {
    docClient.get(params, function (err, data) {
      if (err) reject(err);
      else resolve(data.Item);
    });
  });

  return entries;
};

// Store `data` in `tableName`
//  tableName: admin_announcements | users | hoursLog
export const putData = (tableName, data) => {
  console.log("PUTDATA");
  console.log(data);
  var params = {
    TableName: tableName,
    Item: data,
  };

  docClient.put(params, function (err, data) {
    if (err) {
      console.log("Error", err);
    } else {
      console.log("Success", data);
    }
  });
};

//Where tableName is "admin_announcements", "users", or "hoursLog"
// itemKey is the the actually primary key identifier
// itemKeyName is the name of the primary key
// for admin_announcements table - primary_id
// for hoursLog table - primary_logId
// for users - username
export const deleteItem = (tableName, itemKey, itemKeyName) => {
  var params = {
    TableName: tableName,
    Key: {
      itemKeyName: itemKey,
    },
  };

  docClient.delete(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to delete item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    }
  });
};

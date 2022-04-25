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

//Make it so dont hard code my username
export const fetchUser = async (tableName, user) => {
  console.log(user);
  var params = {
    Key: {
      username: user,
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

export const deleteAnnouncement = (itemKey) => {
  console.log(itemKey);
  var params = {
    Key: {
      primary_id: itemKey,
    },
    TableName: "admin_announcements",
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

export const deleteVolunteer = (itemKey, tableName) => {
  console.log(itemKey);
  var params = {
    Key: {
      username: itemKey,
    },
    TableName: tableName,
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

export const deleteHour = (itemKey) => {
  console.log(itemKey);
  var params = {
    Key: {
      primary_id: itemKey,
    },
    TableName: "logged_hours",
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

export const addHours = (user, newHours, tableName) => {
  console.log(user);
  var params = {
    TableName: tableName,
    Key: {
      username: user,
    },
    UpdateExpression: "set #totalHours= :x",
    ExpressionAttributeNames: { "#totalHours": "totalHours" },
    ExpressionAttributeValues: { ":x": newHours },
  };

  docClient.update(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to update item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Update succeeded:", JSON.stringify(data, null, 2));
    }
  });
};

export const changeVolunteerStatus = (user, tableName, newValue) => {
  console.log(user);
  console.log(tableName);
  console.log(newValue);

  var params = {
    TableName: tableName,
    Key: {
      username: user,
    },
    UpdateExpression: "set #is_Admin= :x",
    ExpressionAttributeNames: { "#is_Admin": "is_Admin" },
    ExpressionAttributeValues: { ":x": newValue },
  };

  docClient.update(params, function (err, data) {
    if (err) {
      console.error(
        "Unable to update item. Error JSON:",
        JSON.stringify(err, null, 2)
      );
    } else {
      console.log("Update succeeded:", JSON.stringify(data, null, 2));
    }
  });
};

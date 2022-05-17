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
  var params = {
    Key: {
      username: user,
    },
    TableName: tableName,
  };
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

export const changeHours = (user, newHours, tableName) => {
  console.log("In Change Hours");
  console.log(user);
  console.log(newHours);
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

export const updateVolunteerInformation = (user, item) => {
  console.log("In Update Volunteer Information");
  console.log(user);
  console.log(item);
  var params = {
    TableName: "volunteers_individual",
    Key: {
      username: user,
    },
    UpdateExpression:
      "SET #hourGoal= :x, #Group= :y, #CommunityService= :a, #CWR= :b, #EC= :c, #ECP= :d, #PhotoP= :e, #STS= :f, #SP= :g, #VolWaiverRelease= :h, #liveScanned= :i, #mailing_address= :j",
    ExpressionAttributeNames: {
      "#hourGoal": "hourGoal",
      "#Group": "Group",
      "#CommunityService": "Community Service",
      "#CWR": "Covid_Waiver_and_Release",
      "#EC": "Emergency_Contact",
      "#ECP": "Emergency_Contact_Phone",
      "#PhotoP": "Photo-Permission",
      "#STS": "Safety Training Status",
      "#SP": "Secondary Phone",
      "#VolWaiverRelease": "Volunter_Waiver_and_Release",
      "#liveScanned": "liveScanned",
      "#mailing_address": "mailing_address",
    },
    ExpressionAttributeValues: {
      ":x": item.hourGoal,
      ":y": item.Group,
      ":a": item["Community Service"],
      ":b": item.Covid_Waiver_and_Release,
      ":c": item.Emergency_Contact,
      ":d": item.Emergency_Contact_Phone,
      ":e": item["Photo-Permission"],
      ":f": item["Safety Training Status"],
      ":g": item["Secondary Phone"],
      ":h": item.Volunter_Waiver_and_Release,
      ":i": item.liveScanned,
      ":j": item.mailing_address,
    },
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

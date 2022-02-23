import * as AWS from "aws-sdk";

const configuration = {
  region: "us-west-2",
  secretAccessKey: "Ce+3UgDRtqrLiow0Es0+b9GGx2wl2K6n9gBM3QeE",
  accessKeyId: "AKIAZHFOZOFY2OHMMXN6",
};

AWS.config.update(configuration);

const docClient = new AWS.DynamoDB.DocumentClient();

export const fetchData = async (tableName) => {
  console.log("in fetch data");
  var params = {
    TableName: tableName,
  };

  let result = await docClient
    .scan(params, function (err, data) {
      if (!err) {
        console.log("DATA");
        console.log(data.Items);
        return data.Items;
      }
    })
    .promise()
    .then((data) => {
      console.log(data);
      return data;
    });
  return result;
};

export const putData = (tableName, data) => {
  console.log("PUTDATA");
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

import { insert } from "./PgClient.js";

const reports = [];

export const saveMessage = async (report) => {
  try {
    console.log("Saving msg into db");
    await insert({
      env: "PROD",
      failed: 0,
      project_name: "External Gateway",
      status: "Pass",
      total: 10,
      total_passed: 10,
    });
    return true;
  } catch (error) {
    console.error(`Failed to insert data into db. ${error}`);
    return false;
  }

  // return new Promise((resolve, reject) => {
  //   try {
  //     reports.push(report);
  //     resolve();
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
};

const ackMessage = async (message) => {
  await message.ack();
  console.log(`Ack message Done for ${message.data.toString()}`);
  return;
};

const validateData = (payload) => {
  try {
    // just validating the json payload but we can add other validation
    return JSON.parse(payload);
  } catch (error) {
    return false;
  }
};
export const processMessage = async (message) => {
  console.log("Message received: ", message.data.toString());
  if (validateData(message.data)) {
    try {
      const status = await saveMessage(JSON.stringify(message.data));
      if (status) {
        await ackMessage(message);
      }
    } catch (error) {
      console.error(`Failed to process message`);
      // For now we are ack to message but actual we need to push in
      // un processed topic
      await ackMessage(message);
    }
  } else {
    console.error("Message valiation failed");
    // For now we are ack to message but actual we need to push in
    // un processed topic
    await ackMessage(message);
  }

  return;
};

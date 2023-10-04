import { pushMessageToApi } from "../utils/index.js";
import { insert } from "./PgClient.js";

const reports = [];

export const saveMessage = async (message) => {
  try {
    const { data: report } = message;
    const payload = {
      projectName: report.project_name,
      env: report.env,
      status: report.status,
      total_passed: report.total_passed,
      total: report.total,
      failed: report.failed,
    };

    console.log(" payload ", payload);
    if (process.env.API_URL) {
      const response = await pushMessageToApi(payload);
      console.log(" pushed date to REST ", response.status, response.body);
      // const savedData = await response.json();
    } else {
      console.log(" Saved data into db ");
      await insert(payload);
    }

    return true;
  } catch (error) {
    console.error(`Failed to insert data with error ${error}`);
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
      const status = await saveMessage(validateData(message.data));
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

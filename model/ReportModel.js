const reports = [];

export const saveMessage = (report) => {
  return new Promise((resolve, reject) => {
    try {
      reports.push(report);
      resolve();
    } catch (error) {
      reject(error);
    }
  });
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
      await saveMessage(JSON.stringify(message.data));
      await ackMessage(message);
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

import { PubSub } from "@google-cloud/pubsub";
import { processMessage } from "./model/ReportModel.js";

// authenticate application using below command
// gcloud auth application-default login
const subscribeConsumer = async () => {
  console.log("subscribe to pubsub");
  const projectId = "burner-amogaikw1";
  const topicNameOrId = `projects/${projectId}/topics/compliance-topic`;
  const subscriptionName = `compliance-topic-sub`;

  const pubSubClient = new PubSub({ projectId });
  const subscribe = await pubSubClient.subscription(subscriptionName, {
    batching: {
      maxMessages: 1,
    },
  });

  const getMessages = async (message) => await processMessage(message);

  subscribe.on("message", getMessages);
};

(async () => await subscribeConsumer())();

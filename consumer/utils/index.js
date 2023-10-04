import axios from "axios";

const API_URL =
  process.env.API_URL ||
  "https://gcp-compliance-api-mrt7r7pbcq-uc.a.run.app/api/v1/compliances";

export const pushMessageToApi = async (payload) => {
  // let data = JSON.stringify({
  //   project_name: "Flash",
  //   env: "PROD",
  //   status: "Passed",
  //   total_passed: 10,
  //   total: 10,
  //   failed: 0,
  // });

  const config = {
    method: "put",
    url: API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(payload),
  };

  const response = await axios.request(config);

  return response;
};

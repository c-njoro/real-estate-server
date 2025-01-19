const cron = require("node-cron");

const { default: axios } = require("axios");

const runCronJobs = () => {
  console.log("Api hitting cron jobs started");
  // This will run every 10 minutes
  cron.schedule("*/10 * * * *", async () => {
    try {
      const externalResponse = await axios.get(
        `${process.env.API_ENDPOINT}/api/properties/allProperties`
      );
      const externalResponsePaginated = await axios.get(
        `${
          process.env.API_ENDPOINT
        }/api/properties/paginatedProperties?_page=${1}&_limit=${10}`
      );
      console.log("cronjob hit the backend");
    } catch (error) {
      console.error("Error fetching external data:", error);
    }
  });
};

module.exports = runCronJobs;

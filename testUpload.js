// testUpload.js
const axios = require("axios");
const inquirer = require("inquirer");
const fs = require("fs");
const FormData = require("form-data");

async function selectFileAndUpload() {
  try {
    const answers = await inquirer.prompt([
      {
        type: "input",
        name: "customerId",
        message: "Enter the Customer ID:",
        validate: (input) => !isNaN(input) && input > 0,
      },
      {
        type: "input",
        name: "filePath",
        message: "Enter the path to the image file:",
        validate: (input) => fs.existsSync(input),
      },
    ]);

    const { customerId, filePath } = answers;
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const response = await axios.post(
      `http://localhost:8008/api/customers/${customerId}/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
      }
    );

    console.log("Upload response:", response.data);
  } catch (error) {
    console.error("Upload failed:", error.response?.data || error.message);
  }
}

selectFileAndUpload();

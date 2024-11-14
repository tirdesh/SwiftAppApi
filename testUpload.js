// testUpload.js
const axios = require('axios');
const inquirer = require('inquirer');
const fs = require('fs');
const FormData = require('form-data');

// Prompt for the customer ID and image file path
async function selectFileAndUpload() {
  try {
    // Step 1: Get Customer ID and file path from user input
    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'customerId',
        message: 'Enter the Customer ID:',
      },
      {
        type: 'input',
        name: 'filePath',
        message: 'Enter the path to the image file:',
      },
    ]);

    const { customerId, filePath } = answers;

    // Step 2: Check if the file exists
    if (!fs.existsSync(filePath)) {
      console.log("File not found. Please make sure the path is correct.");
      return;
    }

    // Step 3: Create FormData for the file upload
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));

    // Step 4: Make a POST request to upload the image
    const response = await axios.post(
      `http://localhost:8008/api/customers/${customerId}/upload`,
      formData,
      {
        headers: {
          ...formData.getHeaders(),
        },
      }
    );

    console.log("Image uploaded successfully:", response.data);
  } catch (error) {
    console.error("Error uploading image:", error.response?.data || error.message);
  }
}

selectFileAndUpload();

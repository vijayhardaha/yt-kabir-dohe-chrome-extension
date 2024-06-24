const axios = require("axios");
const fs = require("fs");
const path = require("path");
const csv = require("csvtojson");

// URL to fetch the CSV data
const url = `https://docs.google.com/spreadsheets/d/e/2PACX-1vQuwtO1d7pHNoKmTEUZjc0I08ZvgwoFgYh3paipOaO0L5UrDI4f7n608C5gc9A-DrgQK9QE5Aa2woyd/pub?gid=0&single=true&output=csv`;

// Function to fetch the data, convert to JSON, and write it to a JSON file
async function fetchAndWriteSheetData() {
  try {
    const response = await axios.get(url);
    const csvData = response.data;

    // Convert CSV to JSON
    const jsonData = await csv().fromString(csvData);

    // Filter, rename fields, and format the Doha
    const filteredData = jsonData
      .map((item) => item["Hindi Doha"].replace("।", "।***"))
      .filter((item) => item.trim() !== "")
      .map((item) => item.split("***").map((doha) => doha.trim()));

    // Define the path to the output file
    const filePath = path.join(__dirname, "..", "src", "comments.json");

    // Ensure the src directory exists
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write the data to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2));

    console.log(`Comments json is ready.`);
  } catch (error) {
    console.error(`Failed to fetch or write data: ${error}`);
  }
}

// Call the function
fetchAndWriteSheetData();

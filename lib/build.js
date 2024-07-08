const axios = require("axios");
const fs = require("fs");
const path = require("path");

// URL to fetch Kabir Ke Dohe API data
const apiUrl = "https://santo-ki-seekh.netlify.app/api/kabir-ke-dohe/";

/**
 * Function to fetch Kabir Ke Dohe data from API endpoint,
 * process it, and write to a JSON file.
 */
async function fetchKabirKeDohe() {
  try {
    // Fetch data from API endpoint
    const response = await axios.get(apiUrl);
    const doheData = response.data;

    // Process or filter data as needed
    const filteredData = doheData
      .filter((item) => item.doha && item.doha.trim() !== "") // Filter out empty doha
      .map((item) => item.doha) // Extract the 'doha' field from each item
      .map((item) => item.split("\n").map((doha) => doha.trim())); // Split each 'doha' by lines and trim whitespace

    // Define the path to the output file
    const filePath = path.join(__dirname, "..", "src", "comments.json");

    // Ensure the src directory exists, create if it doesn't
    fs.mkdirSync(path.dirname(filePath), { recursive: true });

    // Write the processed data to the JSON file with pretty formatting
    fs.writeFileSync(filePath, JSON.stringify(filteredData, null, 2));

    console.log(`Comments JSON is ready at ${filePath}`);
  } catch (error) {
    console.error(`Failed to fetch or write data: ${error}`);
  }
}

// Call the function to fetch and process Kabir Ke Dohe data
fetchKabirKeDohe();
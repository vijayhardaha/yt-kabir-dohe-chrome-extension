import { promises as fs } from "fs";
import path from "path";

import ora from "ora"; // Import ora for spinner

// URL to fetch Kabir Ke Dohe API data
const API_URL = "https://kabir-ke-dohe-api.vercel.app/api/couplets";

/**
 * Fetches Kabir Ke Dohe data from the API using POST method, processes it,
 * and writes the processed data to a JSON file.
 * @async
 * @function
 * @throws Will throw an error if the fetch or file operations fail.
 */
async function fetchKabirKeDohe() {
	const spinner = ora("Fetching data...").start();

	try {
		// Fetch data from the API using POST method
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ perPage: -1 }),
		});

		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}

		const result = await response.json();

		if (!result.success) {
			throw new Error(result.message || "Data fetch unsuccessful");
		}

		// Process and filter data
		const couplets = result.data.couplets
			.filter((item) => item.couplet_hindi?.trim())
			.map((item) => ({
				couplet: item.couplet_hindi.trim(),
				meaning: item.explanation_hindi.trim(),
			}));

		// Define the path to the output file
		const filePath = path.join(process.cwd(), "lib", "comments.json");
		const fileName = path.basename(filePath); // Extract file name

		// Ensure the 'lib' directory exists, create it if necessary
		await fs.mkdir(path.dirname(filePath), { recursive: true });

		// Write the processed data to the JSON file
		await fs.writeFile(filePath, JSON.stringify(couplets, null, 2));

		spinner.succeed(`Comments JSON is ready at ${fileName}`);
	} catch (error) {
		spinner.fail("Failed to fetch or write data");
		console.error(`Error: ${error.message}`);
	}
}

// Call the function to fetch and process Kabir Ke Dohe data
fetchKabirKeDohe();

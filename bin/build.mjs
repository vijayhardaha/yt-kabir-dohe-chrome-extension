import { promises as fs } from "fs";
import path from "path";
import { fileURLToPath } from "url";

import ora from "ora"; // Import ora for spinner

// URL to fetch Kabir Ke Dohe API data
const API_URL = "https://santo-ki-seekh.netlify.app/api/kabir-ke-dohe/";

// Derive __dirname from import.meta.url
const __filename = fileURLToPath( import.meta.url );
const __dirname = path.dirname( __filename );

/**
 * Fetches Kabir Ke Dohe data from the API, processes it,
 * and writes the processed data to a JSON file.
 * @async
 * @function
 * @throws Will throw an error if the fetch or file operations fail.
 */
async function fetchKabirKeDohe() {
	const spinner = ora( "Fetching Kabir Ke Dohe data..." ).start();

	try {
		// Fetch data from the API
		const response = await fetch( API_URL );
		if ( ! response.ok ) {
			throw new Error( "Network response was not ok" );
		}

		const verses = await response.json();

		// Process and filter data
		const filteredData = verses
			.filter( ( item ) => item.verse_hi?.trim() )
			.map( ( item ) => item.verse_hi.split( "\n" ).map( ( verse ) => verse.trim() ) );

		// Define the path to the output file
		const filePath = path.join( __dirname, "..", "src", "comments.json" );
		const fileName = path.basename( filePath ); // Extract file name

		// Ensure the 'src' directory exists, create it if necessary
		await fs.mkdir( path.dirname( filePath ), { recursive: true } );

		// Write the processed data to the JSON file
		await fs.writeFile( filePath, JSON.stringify( filteredData, null, 2 ) );

		spinner.succeed( `Comments JSON is ready at ${ fileName }` );
	} catch ( error ) {
		spinner.fail( "Failed to fetch or write data" );
		console.error( `Error: ${ error.message }` );
	}
}

// Call the function to fetch and process Kabir Ke Dohe data
fetchKabirKeDohe();

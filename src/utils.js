/* global chrome, document */

/**
 * A helper function to select a single element from the DOM.
 *
 * @param {string} selector - A string containing a selector to match.
 * @return {Element|null} - The first element that matches the selector, or null if no matches are found.
 */
export const qs = ( selector ) => {
	try {
		// Use document.querySelector to find the first element that matches the selector
		const element = document.querySelector( selector );

		// Return the found element or null if no match is found
		return element;
	} catch ( error ) {
		// Log an error if the selection process fails
		console.error(
			`Failed to select element with selector "${ selector }":`,
			error,
		);
		return null;
	}
};

/**
 * Prepares a comment by appending a footer and fixing punctuation.
 *
 * @param {string[]} comment - An array of strings representing lines of the comment.
 * @return {string} - The formatted comment as a single string.
 */
export const prepareComment = ( comment ) => {
	// Define the footer to be appended to the comment
	const commentFooter = [ "", "— संत कबीर साहेब जी 🔥 🙏" ];

	// Combine the comment and the footer into a single array and join with newline characters
	return [ ...comment, ...commentFooter ]
		.join( "\n" ) // Join array elements into a single string with newline characters
		.replace( "  ", " " ) // Correct double spacing
		.replace( " ।", "।" ) // Correct spacing around punctuation "।"
		.replace( " ।।", "।।" ); // Correct spacing around punctuation "।।"
};

/**
 * Fetches a random comment from the comments JSON file.
 *
 * @return {Promise<string[]>} - A promise that resolves to a random comment array.
 */
export const fetchRandomComment = async () => {
	try {
		// Fetch comments from the JSON file using Chrome extension API
		const response = await fetch( chrome.runtime.getURL( "lib/comments.json" ) );
		const comments = await response.json();

		// Pick a random comment from the comments array
		return comments[ Math.floor( Math.random() * comments.length ) ];
	} catch ( error ) {
		// Log an error if the fetching process fails
		console.error( "Failed to fetch comments:", error );
		return []; // Return an empty array in case of error
	}
};

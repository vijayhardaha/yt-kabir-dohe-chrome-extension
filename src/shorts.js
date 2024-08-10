import { prepareComment, qs, fetchRandomComment } from "./utils.js";

/**
 * Immediately-invoked async function to fetch a random comment, post it, and like the video.
 */
( async function() {
	try {
		// Fetch a random comment from the comments JSON file
		const randomComment = await fetchRandomComment();

		/**
		 * Posts a comment to the YouTube comment box.
		 * @param {string} comment - The comment text to be posted.
		 * @return {void}
		 */
		const postComment = async ( comment ) => {
			try {
				// Find the placeholder box where the comment input area is activated
				const placeholderBox = qs( "#simple-box #placeholder-area" );
				if ( placeholderBox !== null ) {
					placeholderBox.click(); // Click the placeholder box to activate the comment input area

					// Find the editable comment box and set its text to the prepared comment
					const commentBox = qs( "#contenteditable-root" );
					if ( commentBox !== null ) {
						commentBox.innerText = prepareComment( comment ); // Set the comment text
					}
				}
			} catch ( error ) {
				// Log an error if the process fails
				console.error( "Failed to post the comment:", error );
			}
		};

		/**
		 * Function to like the video.
		 * @return {void}
		 */
		const likeVideo = () => {
			try {
				// Find the like button and click it if it is not already liked
				const likeButton = qs(
					"like-button-view-model button[title=\"I like this\"]",
				);
				if ( likeButton !== null ) {
					likeButton.click();
				}
			} catch ( error ) {
				// Log an error if the process fails
				console.error( "Failed to like the video:", error );
			}
		};

		// Execute the functions to post a comment and like the video
		await postComment( randomComment );
		likeVideo();
	} catch ( error ) {
		// Log an error if the overall process fails
		console.error( "An error occurred:", error );
	}
}() );

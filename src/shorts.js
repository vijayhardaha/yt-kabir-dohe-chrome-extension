import { prepareComment, qs, fetchRandomComment } from "./utils.js";

/**
 * Immediately-invoked async function to fetch a random comment, post it, and like the video.
 */
( async function() {
	try {
		// Fetch a random comment
		const randomComment = await fetchRandomComment();

		/**
		 * Posts a comment to the YouTube comment box.
		 * @param {string} comment - The comment text to be posted.
		 * @return {boolean} - Returns false if the comment button or other elements are not found.
		 */
		const postComment = async ( comment ) => {
			try {
				// Find the comment button and click it
				const commentButton = qs( "#comments-button .yt-spec-button-shape-with-label > button" );
				if ( ! commentButton ) {
					return false; // Exit if comment button is not found
				}
				commentButton.click();

				// Wait for the comment box to be available
				setTimeout( () => {
					// Find and click the placeholder box
					const placeholderBox = qs( "#placeholder-area #simplebox-placeholder" );
					if ( ! placeholderBox ) {
						return false; // Exit if placeholder box is not found
					}
					placeholderBox.click();

					// Find the comment box and post the comment
					const commentBox = qs( ".ytd-comment-simplebox-renderer #contenteditable-root" );
					if ( ! commentBox ) {
						return false; // Exit if comment box is not found
					}
					commentBox.click();
					commentBox.innerText = prepareComment( comment );
				}, 100 );
			} catch ( error ) {
				console.error( "Failed to post the comment:", error );
			}
		};

		/**
		 * Likes the video.
		 * @return {void}
		 */
		const likeVideo = () => {
			try {
				// Find the like button and click it if it is not already liked
				const likeButton = qs( "#like-button .yt-spec-button-shape-with-label > button[aria-pressed=false]" );
				if ( likeButton ) {
					likeButton.click();
				}
			} catch ( error ) {
				console.error( "Failed to like the video:", error );
			}
		};

		// Execute the functions
		await postComment( randomComment );
		likeVideo();
	} catch ( error ) {
		console.error( "An error occurred:", error );
	}
}() );

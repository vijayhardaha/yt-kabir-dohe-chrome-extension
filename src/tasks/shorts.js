/* global chrome */

const qs = (selector) => {
	try {
		return document.querySelector(selector);
	} catch (error) {
		console.error(
			`Failed to select element with selector "${selector}":`,
			error
		);
		return null;
	}
};

const prepareComment = (comment) => {
	const { couplet, meaning } = comment;
	const coupletArr = couplet.split("\n").map((v) => v.trim());
	const commentFooter = ["", "— संत कबीर साहेब जी 🔥 🙏"];

	return [...coupletArr, "", `अर्थ: ${meaning}`, ...commentFooter]
		.join("\n")
		.replace("  ", " ")
		.replace(" ।", "।")
		.replace(" ।।", "।।");
};

const fetchRandomComment = async () => {
	try {
		const response = await fetch(chrome.runtime.getURL("comments.json"));
		const comments = await response.json();

		return comments[Math.floor(Math.random() * comments.length)];
	} catch (error) {
		console.error("Failed to fetch comments:", error);
		return [];
	}
};

/**
 * Immediately-invoked async function to fetch a random comment, post it, and like the video.
 */
(async function () {
	try {
		// Fetch a random comment
		const randomComment = await fetchRandomComment();

		/**
		 * Posts a comment to the YouTube comment box.
		 * @param {string} comment - The comment text to be posted.
		 * @return {boolean} - Returns false if the comment button or other elements are not found.
		 */
		const postComment = async (comment) => {
			try {
				// Find the comment button and click it
				const commentButton = qs(
					"ytd-reel-video-renderer[is-active] #comments-button .yt-spec-button-shape-with-label > button"
				);
				if (!commentButton) {
					return false; // Exit if comment button is not found
				}
				commentButton.click();

				// Wait for the comment box to be available
				setTimeout(() => {
					// Find and click the placeholder box
					const placeholderBox = qs(
						"ytd-reel-video-renderer[is-active] #placeholder-area #simplebox-placeholder"
					);
					if (!placeholderBox) {
						return false; // Exit if placeholder box is not found
					}
					placeholderBox.click();

					// Find the comment box and post the comment
					const commentBox = qs(
						"ytd-reel-video-renderer[is-active] .ytd-comment-simplebox-renderer #contenteditable-root"
					);
					if (!commentBox) {
						return false; // Exit if comment box is not found
					}
					commentBox.click();
					commentBox.innerText = prepareComment(comment);
				}, 100);
			} catch (error) {
				console.error("Failed to post the comment:", error);
			}
		};

		/**
		 * Likes the video.
		 * @return {void}
		 */
		const likeVideo = () => {
			try {
				// Find the like button and click it if it is not already liked
				const likeButton = qs(
					"ytd-reel-video-renderer[is-active] ytd-toggle-button-renderer#like-button .yt-spec-button-shape-with-label > button[aria-pressed=false]"
				);
				if (likeButton) {
					likeButton.click();
				}
			} catch (error) {
				console.error("Failed to like the video:", error);
			}
		};

		// Execute the functions
		await postComment(randomComment);
		likeVideo();
	} catch (error) {
		console.error("An error occurred:", error);
	}
})();

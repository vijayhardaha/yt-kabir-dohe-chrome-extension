/* global chrome */

// Immediately Invoked Function Expression (IIFE) to encapsulate the code
(async function () {
  try {
    // Fetch comments from the JSON file using Chrome extension API
    const response = await fetch(chrome.runtime.getURL("src/comments.json"));
    const comments = await response.json();

    // Pick a random comment from the comments array
    const randomComment = comments[Math.floor(Math.random() * comments.length)];

    /**
     * Prepares a comment by appending a footer and fixing punctuation.
     *
     * @param {string[]} comment - An array of strings representing lines of the comment.
     * @return {string} - The formatted comment as a single string.
     */
    const prepareComment = (comment) => {
      // Define the footer to be appended to the comment
      const commentFooter = ["", "~ संत कबीर साहेब जी ❤️❤️"];

      // Combine the comment and the footer into a single array and join with newline characters
      return [...comment, ...commentFooter]
        .join("\n") // Join array elements into a single string with newline characters
        .replace(" ।", "।") // Correct spacing around punctuation "।"
        .replace(" ॥", "॥"); // Correct spacing around punctuation "॥"
    };

    /**
     * A helper function to select a single element from the DOM.
     *
     * @param {string} selector - A string containing a selector to match.
     * @return {Element|null} - The first element that matches the selector, or null if no matches are found.
     */
    const qs = (selector) => {
      try {
        // Use document.querySelector to find the first element that matches the selector
        const element = document.querySelector(selector);

        // Return the found element or null if no match is found
        return element;
      } catch (error) {
        // Log an error if the selection process fails
        console.error(
          `Failed to select element with selector "${selector}":`,
          error
        );
        return null;
      }
    };

    /**
     * Posts a comment to the YouTube comment box.
     *
     * @param {string[]} comment - An array of strings representing lines of the comment.
     */
    const postComment = async (comment) => {
      try {
        // Simulate a click on the comment area to activate the comment box
        const placeholderBox = qs("#simple-box #placeholder-area");

        if (placeholderBox !== null) {
          placeholderBox.click(); // Click the placeholder box to activate the comment input area

          // Find the editable comment box and set its text to the prepared comment
          const commentBox = qs("#contenteditable-root");
          if (commentBox !== null) {
            commentBox.innerText = prepareComment(comment); // Set the comment text
          }
        }
      } catch (error) {
        // Log an error if the process fails
        console.error("Failed to post the comment:", error);
      }
    };

    // Function to like the video
    /**
     * Likes the current YouTube video.
     */
    const likeVideo = () => {
      try {
        // Find the like button using a CSS selector
        const likeButton = qs(
          'like-button-view-model button[title="I like this"]'
        );
        // If the like button exists, click it to like the video
        if (likeButton !== null) likeButton.click();
      } catch (error) {
        // Log an error if the process fails
        console.error("Failed to like the video:", error);
      }
    };

    // Execute the functions to post a comment and like the video
    await postComment(randomComment);
    likeVideo();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

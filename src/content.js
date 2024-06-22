/* global chrome */

// Immediately Invoked Function Expression (IIFE) to encapsulate the code
(async function () {
  try {
    // Fetch comments from the JSON file using Chrome extension API
    const response = await fetch(chrome.runtime.getURL("src/comments.json"));
    const comments = await response.json();

    // Pick a random comment from the comments array
    const randomComment =
      comments[Math.floor(Math.random() * comments.length)].doha;

    // Function to post a comment
    const postComment = async (comment) => {
      try {
        // Simulate a click on the comment area
        const placeholderBox = document.querySelector(
          "#simple-box #placeholder-area"
        );

        if (placeholderBox !== null) {
          placeholderBox.click();

          // Find the comment box and set its text to the chosen random comment
          const commentBox = document.querySelector("#contenteditable-root");
          if (commentBox !== null){
            commentBox.innerText = comment;
          }
        }
      } catch (error) {
        console.error("Failed to post the comment:", error);
      }
    };

    // Function to like the video
    const likeVideo = () => {
      try {
        // Find and click the like button if it exists
        const likeButton = document.querySelector(
          'like-button-view-model button[title="I like this"]'
        );
        if (likeButton !== null) likeButton.click();
      } catch (error) {
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

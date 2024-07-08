/* global chrome */

// Add a listener for the extension icon click event
chrome.action.onClicked.addListener((tab) => {
  // Check if the URL of the clicked tab includes "youtube.com/watch"
  if (tab.url.includes("youtube.com/watch")) {
    // Execute a content script in the tab
    chrome.scripting.executeScript({
      target: {tabId: tab.id}, // Specify the tab to execute the script in
      files: ["src/content.js"], // Specify the content script file to execute
    });
  } else {
    // Log a message if the tab URL is not a YouTube watch page
    console.log("This extension only works on YouTube watch pages.");
  }
});

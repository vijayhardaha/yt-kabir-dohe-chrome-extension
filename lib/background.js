/* global chrome */

/**
 * Adds a listener for the extension icon click event.
 * Executes different content scripts based on the type of YouTube page (watch or shorts).
 */
chrome.action.onClicked.addListener( ( tab ) => {
	// Check if the URL of the clicked tab includes "youtube.com/watch" or "youtube.com/shorts"
	if ( tab.url.includes( "youtube.com/watch" ) ) {
		// Execute the content script for regular YouTube videos
		chrome.scripting.executeScript( {
			target: { tabId: tab.id },
			files: [ "lib/scripts/watch.js" ],
		} );
	} else if ( tab.url.includes( "youtube.com/shorts" ) ) {
		// Execute the content script for YouTube Shorts
		chrome.scripting.executeScript( {
			target: { tabId: tab.id },
			files: [ "lib/scripts/shorts.js" ],
		} );
	} else {
		// Log a message if the tab URL is not a YouTube video or Shorts page
		console.log( "This extension only works on YouTube watch pages and Shorts." );
	}
} );

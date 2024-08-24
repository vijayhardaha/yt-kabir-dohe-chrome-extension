# YouTube Kabir Ke Dohe - Chrome Extension

**YouTube Kabir Ke Dohe - Chrome Extension** is a Chrome extension that automates the process of posting a comment and liking YouTube videos. When you click on the extension icon while on a YouTube video page, it randomly picks a "Kabir's doha" from a predefined list and posts it, and likes the video.

> Note: You'll need to press the "comment" button manually. This extension will only automatically write the doha (couplet) in the comment box of your YouTube video. Due to YouTube's rules and regulations, which are in place to prevent spam and misuse, automated commenting systems are restricted. Therefore, the extension can only assist with writing the comment but cannot bypass the manual action required to submit it. This approach helps ensure that comments are not flagged as spam and comply with YouTube's policies.

## Features

- Automatically posts a "Kabir Ke Dohe" comment on a YouTube video.
- Likes the current YouTube video.
- Comments are randomly selected from a predefined list stored in a JSON file.
- Works only on YouTube video/watch pages.

## Installation

To install the extension locally:

1. Clone the repository:

   ```sh
   git clone https://github.com/vijayhardaha/yt-kabir-dohe-chrome-extension.git
   ```

2. Navigate to the cloned directory:

   ```sh
   cd yt-kabir-dohe-chrome-extension
   ```

3. Open the Chrome browser and go to `chrome://extensions/`.

4. Enable "Developer mode" using the toggle switch in the top-right corner.

5. Click "Load unpacked" and select the directory where you cloned the repository.

## Usage

1. Navigate to a YouTube video page.
2. Scroll down the page until the comment section is rendered and visible.
3. Click the YouTube Auto Commenter - Kabir Ke Dohe extension icon in the Chrome toolbar.
4. The extension will post a randomly selected "Kabir Ke Dohe" from the predefined list and like the video.

## Development

### Directory Structure

```
yt-kabir-dohe-chrome-extension/
├── .github/
│   └── workflows/
│       └── release.yml   # GitHub Actions workflow for releases
├── icons/
│   ├── icon128.png           # 128x128 pixel icon for the extension
│   ├── icon16.png            # 16x16 pixel icon for the extension
│   ├── icon32.png            # 32x32 pixel icon for the extension
│   └── icon48.png            # 48x48 pixel icon for the extension
├── lib/
│   ├── background.js         # Background script for handling extension events and messaging
│   ├── comments.json         # JSON file containing predefined "Kabir Ke Dohe" comments
│   └── scripts/
│       ├── shorts.js         # Script for interacting with YouTube Shorts pages
│       └── watch.js          # Script for interacting with regular YouTube video pages
├── manifest.json             # Manifest file defining the extension, permissions, and settings
├── src/
│   ├── bin/
│   │   └── build.mjs         # Script for building the extension using modern JavaScript
│   ├── shorts.js             # Additional logic specific to YouTube Shorts
│   ├── utils.js              # Utility functions used across different scripts
│   └── watch.js              # Additional logic specific to YouTube video watch pages
└── webpack.config.js         # Configuration file for Webpack bundling
```

### Scripts

- `background.js`: Handles background tasks and communication with content scripts.
- `comments.json`: Contains "Kabir Ke Dohe" for posting comments on YouTube.
- `shorts.js`: Manages interactions with YouTube Shorts, such as commenting and liking.
- `watch.js`: Handles interactions on regular YouTube video pages, like commenting and liking.

### GitHub Actions

This project uses GitHub Actions to automate the release process. The workflow file `.github/workflows/release.yml` handles:

- Bundling the extension files into a ZIP archive.
- Creating a GitHub release.
- Uploading the ZIP archive to the release.

To trigger a release, push a tag to the repository:

```sh
git tag v1.0.0
git push origin v1.0.0
```

## Contribution

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your changes (`git commit -m 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

# YouTube Kabir Ke Dohe - Chrome Extension

YouTube Kabir Ke Dohe - Chrome Extension is a Chrome extension that automates the process of posting a comment and liking YouTube videos. When you click on the extension icon while on a YouTube video page, it randomly picks a "Kabir's doha" from a predefined list and posts it, and likes the video.

> Note: You'll have to press comment button on your own, this extension will only write the doha in your Youtube's video comment box.

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
2. Click the YouTube Auto Commenter - Kabir Ke Dohe extension icon in the Chrome toolbar.
3. The extension will post a randomly selected "Kabir Ke Dohe" from the predefined list and like the video.

## Development

### Directory Structure

```
yt-kabir-dohe-chrome-extension/
├── .github/
│   └── workflows/
│       └── release.yml
├── icons/
│   ├── icon16.png
│   ├── icon32.png
│   ├── icon48.png
│   ├── icon128.png
├── lib/
│   ├── build.js
├── src/
│   ├── content.js
│   ├── background.js
│   ├── comments.json
├── manifest.json
├── README.md
```

### Scripts

- `background.js`: Handles the click event of the extension button.
- `content.js`: Interacts with the YouTube page to post a comment and like the video.
- `comments.json`: Stores the list of "Kabir Ke Dohe".
- `manifest.json`: Defines the extension and its permissions.

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

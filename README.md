# YouTube Kabir Ke Dohe – Chrome Extension

A small utility that helps you spread the wisdom of **Kabir Ke Dohe** on YouTube.

Whenever you watch a video or a Short, the extension can automatically:

- post a randomly chosen couplet (with meaning and footer) as a comment, and
- hit the like button for you.

Everything is done with a single click on the extension icon, and the messages come from a curated list of dohas stored in the extension.

## Who is this for?

This extension is meant for:

- fans of Kabir’s poetry who want to share his words
- people looking for a fun way to interact with YouTube
- anyone who likes a little automation while browsing

There is no tracking, no ads, and the dohas are fetched from a local JSON file; you remain in control of when the comment is posted.

> **Note:** use responsibly. YouTube may take action against accounts that post excessively or appear spammy.

## Features

- **Random “Kabir Ke Dohe” comments** – every click selects a couplet with its meaning and a signature footer.
- **Automatic like** – the current video or Short is liked along with the comment.
- **Works on both regular watch pages and Shorts.**
- **Easy to refresh data** – the list of couplets (`comments.json`) can be updated using the provided script.

## Installing the Extension

1. **Download or clone** the repository:

   ```sh
   git clone https://github.com/vijayhardaha/yt-kabir-dohe-chrome-extension.git
   ```

2. Open Chrome and go to `chrome://extensions/`.

3. Turn on **Developer mode** (toggle in the top‑right).

4. Click **Load unpacked** and select the project folder (or the `dist` folder if you built it).

   The extension’s icon should now appear next to the address bar.

## Using the Extension

1. Navigate to any YouTube video or Shorts page.

2. Scroll down so the comment area is visible (it helps the script find the right elements).

3. Click the extension icon once.
   - A random Kabir couplet will be inserted into the comment box.
   - The video will be liked automatically.

You can click again to post another comment (YouTube will prompt if you try to post too quickly).

## Updating the Comment List

The file `public/comments.json` contains all of the couplets the extension can post. To refresh it with new data:

```sh
pnpm fetchdata
```

(If you’re not a developer, you can simply replace the JSON file manually with your own structure of `{couplet, meaning}` objects.)

## Where the Data Comes From

The comments are sourced from the **Kabir Ke Dohe API**. A small script in `scripts/fetchComments.mjs` pulls every couplet, filters out empty entries, and writes them to `public/comments.json`. This script is run during development; end users don’t need to worry about it.

## Privacy & Permissions

- The extension only runs on `youtube.com` URLs.
- It does **not** collect or send any personal data.
- All comment text is stored locally; nothing is transmitted to external servers during normal operation.

## Support & Contributions

This project is open‑source and released under the [MIT License](LICENSE).
If you encounter issues or have improvement ideas, feel free to open an issue or submit a pull request on the GitHub repository.

## License

Licensed under the [MIT License](LICENSE). See the full text in the `LICENSE` file.

---

Enjoy spreading Kabir’s wisdom one comment at a time!

# Gistup

Welcome to **Gistup**, a powerful VS Code extension designed to streamline your workflow by enabling seamless creation and management of GitHub gists directly from your editor. With Gistup, you can effortlessly upload files or selections as gists and configure their visibility and other settings with ease.

## Features

Gistup offers a range of features to enhance your coding experience:

-   **Create Gists**: Upload a file or selection as a gist with just a few clicks.
-   **Visibility Options**: Choose the visibility of your gist – public, private, or selection-based.
-   **Clipboard Integration**: Optionally copy the URL of the uploaded gist to your clipboard for easy sharing.
-   **GitHub Authentication**: Use your GitHub token to securely authenticate and upload gists.

## Requirements

Gistup requires the following to function correctly:

-   **VS Code**: Ensure you have the latest version of Visual Studio Code installed.
-   **GitHub Account**: A GitHub account to upload and manage your gists.
-   **GitHub Token**: Generate a GitHub token with the necessary permissions for gist creation.

## Extension Settings

Gistup provides several configurable settings through the `contributes.configuration` extension point:

-   `gistup.visibility`: Set the visibility of the uploaded gist.
    -   Options: `selection`, `private`, `public`
    -   Default: `selection`
-   `gistup.gistToken`: Your GitHub token used to authenticate gist uploads.
    -   Default: `""`
-   `gistup.copyGistUrlToClipboard`: Automatically copy the gist URL to the clipboard after a successful upload.
    -   Default: `false`

**Enjoy!**

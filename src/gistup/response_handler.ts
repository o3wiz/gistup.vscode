import * as vscode from "vscode";
import axios from "axios";

export function handleGistUploadResponse(response: axios.AxiosResponse<any, any>) {
    if (response.status >= 300) {
        throw new Error(`${response.status} ${response.statusText}`);
    }
    const data = response.data;
    const gistURL = data.html_url;
    const config = vscode.workspace.getConfiguration("gistup");
    const copyGistToClipboard = config.get<boolean>("copyGistUrlToClipboard", false);
    if (copyGistToClipboard) {
        vscode.env.clipboard
            .writeText(gistURL)
            .then(() => vscode.window.showInformationMessage("Gist URL copied to clipboard"));
    }
    const openInBrowserBtn = "Open In Browser";
    vscode.window.showInformationMessage("Gist created successfully", openInBrowserBtn).then(selection => {
        if (openInBrowserBtn === selection) {
            vscode.env.openExternal(vscode.Uri.parse(gistURL));
        }
    });
}

import * as vscode from "vscode";
import {File, FileSelection} from "./file";
import {gistup} from "./gistup";
import {Visibility} from "./visibility";
import * as lodash from "lodash";
import {handleGistUploadResponse} from "./response_handler";

function getActiveFile(): File[] {
    const activeEditor = vscode.window.activeTextEditor;
    return lodash.compact([activeEditor]).map(editor => {
        const fileName = editor.document.fileName.split("/").at(-1)!;
        return {
            name: fileName,
            content: editor.document.getText(),
        };
    });
}

function getActiveFiles(): File[] {
    const activeEditors = vscode.window.visibleTextEditors;
    return lodash.compact(activeEditors).map(editor => {
        const fileName = editor.document.fileName.split("/").at(-1)!;
        return {
            name: fileName,
            content: editor.document.getText(),
        };
    });
}

type GistOptions = {
    files: File[];
    visibility: Visibility;
    title: string;
};
async function getGistOptions(filesSelection: () => File[]): Promise<GistOptions> {
    const config = vscode.workspace.getConfiguration("gistup");
    const confVisibility = config.get<string>("visibility", "selection");
    const files = filesSelection();
    if (0 === files.length) {
        throw new Error("no file was selected");
    }
    let visibility: Visibility;
    if ("selection" === confVisibility) {
        const visibilityChoice = await vscode.window.showQuickPick(["public", "private"], {
            ignoreFocusOut: true,
            title: "Gist visibility",
        });
        if (!visibilityChoice) {
            throw new Error("No visibility choice selected, operation aborted.");
        }
        visibility = "public" === visibilityChoice ? Visibility.Public : Visibility.Private;
    } else {
        visibility = "public" === confVisibility ? Visibility.Public : Visibility.Private;
    }
    const gistTitle = await vscode.window.showInputBox({
        ignoreFocusOut: true,
        placeHolder: "Enter gist title",
        title: "Gist title",
    });
    if (!gistTitle) {
        throw new Error("No gist title inserted, operation aborted.");
    }
    return {
        files: files,
        visibility: visibility,
        title: gistTitle,
    };
}

export async function uploadFiles(selection: FileSelection): Promise<void> {
    const config = vscode.workspace.getConfiguration("gistup");
    const gistToken = config.get<string>("gistToken", "");
    const filesSelection: () => File[] = FileSelection.Single === selection ? getActiveFile : getActiveFiles;
    const {files, visibility, title} = await getGistOptions(filesSelection);
    const response = await gistup.uploadFiles(title, files, visibility, gistToken);
    handleGistUploadResponse(response);
}

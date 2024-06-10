import * as vscode from "vscode";
import {FileSelection} from "./gistup/file";
import {uploadFiles} from "./gistup/commands";

export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.commands.registerCommand("gistup.gistActiveFile", async () => {
            try {
                await uploadFiles(FileSelection.Single);
            } catch (e) {
                vscode.window.showErrorMessage((e as Error).message);
            }
        })
    );
    context.subscriptions.push(
        vscode.commands.registerCommand("gistup.gistActiveFiles", async () => {
            try {
                await uploadFiles(FileSelection.Multi);
            } catch (e) {
                vscode.window.showErrorMessage((e as Error).message);
            }
        })
    );
}

export function deactivate() {}

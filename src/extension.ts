import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
    console.log("Congratulations, your extension 'gistup' is now active!");
    let disposable = vscode.commands.registerCommand("gistup.helloWorld", () => {
        const warningMessage = "This is a warning message";
        vscode.window.showWarningMessage(warningMessage);
    });
    context.subscriptions.push(disposable);
}

export function deactivate() {}

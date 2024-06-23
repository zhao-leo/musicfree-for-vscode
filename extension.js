const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.error('Congratulations, your extension "musicfree-for-vscode" is now active!');

	const disposable = vscode.commands.registerCommand('musicfree-for-vscode.helloWorld', function () {

		vscode.window.showInformationMessage('Hello World from MusicFree for VScode!');
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}

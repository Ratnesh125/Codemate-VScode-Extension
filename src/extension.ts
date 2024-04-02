import * as fs from 'fs';
import * as vscode from 'vscode';

function getWebviewContent(context: vscode.ExtensionContext): string {

	const htmlPath = vscode.Uri.file(context.asAbsolutePath('src/chatInterface.html'));
	const htmlContent = fs.readFileSync(htmlPath.fsPath, 'utf-8');
	return htmlContent;
}

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('codemate.codeMate', () => {

		const panel = vscode.window.createWebviewPanel(
			'chatPanel',
			'Chat Interface',
			vscode.ViewColumn.Two,
			{
				enableScripts: true
			}
		);

		const htmlContent = getWebviewContent(context);
		panel.webview.html = htmlContent;
		panel.webview.postMessage({ vscode: true });

		panel.webview.onDidReceiveMessage(
			message => {
				switch (message.command) {
					case 'copyToTerminal':
						vscode.window.activeTerminal?.sendText(message.output, false);
						return;
				}
			},
			undefined,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

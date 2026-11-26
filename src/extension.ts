import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext): void {
  context.subscriptions.push(
    vscode.commands.registerCommand('ignoreXray.auditContext', () => undefined),
    vscode.commands.registerCommand('ignoreXray.rescanWorkspace', () => undefined),
  );
}

export function deactivate(): void {
  // Cleanup handled in T-12
}

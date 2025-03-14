import * as vscode from 'vscode';
import { insertEnum, FormatDigit, insertEnumEx } from './enumirator';


export type TE = vscode.TextEditor;

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('enumerator.fill-enum-dec', (t: TE) => insertEnum(t, FormatDigit.dec)));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('enumerator.fill-enum-dec-padded', (t: TE) => insertEnum(t, FormatDigit.dec0)));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('enumerator.fill-enum-hex', (t: TE) => insertEnum(t, FormatDigit.hex)));

	context.subscriptions.push(vscode.commands.registerTextEditorCommand('enumerator.fill-enum-ex', async (t: TE) => insertEnumEx(t)));
}

export function deactivate() { }

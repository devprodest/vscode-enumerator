import * as vscode from 'vscode';


type TE = vscode.TextEditor;

enum FormatDigit { dec, dec0, hex };

function insertEnum(textEditor: TE, format: FormatDigit, start: number = 0, step: number = 1): void {
	let counter: number = start;

	const maxNum = String(textEditor.selections.length).length;
	const zeroPad = (num: string) => num.padStart(maxNum, '0');

	textEditor.edit(editBuilder => {
		textEditor.selections.forEach(s => {

			switch (format) {
				case FormatDigit.dec:
					editBuilder.replace(s, counter.toString());
					break;
				case FormatDigit.dec0:
					editBuilder.replace(s, zeroPad(counter.toString()));
					break;
				case FormatDigit.hex:
					editBuilder.replace(s, zeroPad(counter.toString(16)));
					break;
				default:
					break;
			};

			editBuilder.replace(s, String(counter));
			counter += step;
		});
	});
}


export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('enumerator.fill-enum-dec', (t: TE) => insertEnum(t, FormatDigit.dec)));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('enumerator.fill-enum-dec-padded', (t: TE) => insertEnum(t, FormatDigit.dec0)));
	context.subscriptions.push(vscode.commands.registerTextEditorCommand('enumerator.fill-enum-hex', (t: TE) => insertEnum(t, FormatDigit.hex)));
}

export function deactivate() { }

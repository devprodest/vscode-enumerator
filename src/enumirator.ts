import * as vscode from 'vscode';

export enum FormatDigit {
	dec, dec0, hex
}

const getRagix = (format: FormatDigit) => format === FormatDigit.hex ? 16 : 10;

export function insertEnum(textEditor: vscode.TextEditor, format: FormatDigit, start: number = 0, step: number = 1): void {
	let counter: number = start;

	const radix = getRagix(format);
	const maxlen = (textEditor.selections.length * step + start).toString(radix).length;

	const zeroPadding = (num: string) => num.padStart(maxlen, '0');

	textEditor.edit(editBuilder => {
		textEditor.selections.forEach(s => {

			switch (format) {
				case FormatDigit.dec:
					editBuilder.replace(s, counter.toString());
					break;
				case FormatDigit.dec0:
				case FormatDigit.hex:
					editBuilder.replace(s, zeroPadding(counter.toString(radix)));
					break;
				default:
					break;
			};
			counter += step;
		});
	});
}
export async function insertEnumEx(textEditor: vscode.TextEditor) {

	let IBoxOptions: vscode.InputBoxOptions = {
		prompt: '1|01|x1',
		placeHolder: '01 1',
		password: false
	};

	const inputPattern = await vscode.window.showInputBox(IBoxOptions);
	if (!inputPattern || inputPattern == "") {
		return;
	}
	if (inputPattern.length > 1) {
		const inputformat = inputPattern.match(/^([a,x,0]?)([\da-f]*)\ *([\da-f]*)/);

		const format = inputformat?.[1] == "" ? "d" : inputformat?.[1] ?? "d";
		const start = inputformat?.[2] == "" ? "0" : inputformat?.[2] ?? "0";
		const step = inputformat?.[3] == "" ? "1" : inputformat?.[3] ?? "1";

		const insertFormat: FormatDigit = {
			"0": FormatDigit.dec0,
			"d": FormatDigit.dec,
			"x": FormatDigit.hex,
		}[format] ?? FormatDigit.dec;

		const radix = getRagix(insertFormat);

		insertEnum(textEditor, insertFormat, Number.parseInt(start, radix), Number.parseInt(step, radix));
	}
	else { insertEnum(textEditor, FormatDigit.dec, Number.parseInt(inputPattern)); }
}

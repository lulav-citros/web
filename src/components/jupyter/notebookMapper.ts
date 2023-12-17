import { KernelMessage } from '@jupyterlab/services';
import { IDisplayData, IError, IExecuteResult, INotebookContent, IOutput, IStream } from '@jupyterlab/nbformat';

export function toIOutputList(messages: KernelMessage.IMessage[]): IOutput[] {
    const outputs: IOutput[] = [];

    for (const message of messages) {
        if (KernelMessage.isStreamMsg(message)) {
            const output: IStream = {
                output_type: 'stream',
                text: message.content.text,
                name: message.content.name,
            };
            outputs.push(output);
        } else if (KernelMessage.isDisplayDataMsg(message)) {
            const output: IDisplayData = {
                output_type: 'display_data',
                ...message.content,
            };
            outputs.push(output);
        } else if (KernelMessage.isExecuteResultMsg(message)) {
            const output: IExecuteResult = {
                output_type: 'execute_result',
                ...message.content,
            };
            outputs.push(output);
        } else if (KernelMessage.isErrorMsg(message)) {
            const output: IError = {
                output_type: 'error',
                ...message.content,
            };
            outputs.push(output);
        }
    }

    return outputs;
}

export function extractExecuteInput(messages: KernelMessage.IMessage[]): KernelMessage.IExecuteInputMsg | null {
    for (const message of messages) {
        if (KernelMessage.isExecuteInputMsg(message)) {
            return message;
        }
    }
    return null;
}

export function extractErrorMsg(messages: KernelMessage.IMessage[]): KernelMessage.IErrorMsg | null {
    for (const message of messages) {
        if (KernelMessage.isErrorMsg(message)) {
            return message;
        }
    }
    return null;
}

export function compareChangeSource(state?: INotebookContent, initialState?: INotebookContent): boolean {
    if (!state || !initialState) return true;
    // return contentsToString(state) !== contentsToString(initialState);
    return contentsToString(state) !== contentsToString(initialState);
}

function contentsToString(content: INotebookContent) {
    // return JSON.stringify(content);
    return content.cells
        .map(
            (value) => (Array.isArray(value.source) ? value.source.join('') : value.source) // + JSON.stringify(value.outputs)
        )
        .join('');
}

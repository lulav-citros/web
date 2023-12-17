import { KernelMessage } from '@jupyterlab/services';
import { IDisplayData, IError, IExecuteResult, IStream } from '@jupyterlab/nbformat';

export function fromKernelStreamMessage(msg: KernelMessage.IStreamMsg): IStream {
    return {
        output_type: 'stream',
        text: msg.content.text,
        name: msg.content.name,
    };
}

export function fromKernelDisplayDataMessage(msg: KernelMessage.IDisplayDataMsg): IDisplayData {
    return {
        output_type: 'display_data',
        data: msg.content.data,
        metadata: msg.content.metadata,
    };
}

export function fromKernelErrorMessage(msg: KernelMessage.IErrorMsg): IError {
    return {
        output_type: 'error',
        evalue: msg.content.evalue,
        ename: msg.content.ename,
        traceback: msg.content.traceback,
    };
}

export function fromKernelExecuteResultMessage(msg: KernelMessage.IExecuteResultMsg): IExecuteResult {
    return {
        output_type: 'execute_result',
        data: msg.content.data,
        metadata: msg.content.metadata,
        execution_count: msg.content.execution_count,
    };
}

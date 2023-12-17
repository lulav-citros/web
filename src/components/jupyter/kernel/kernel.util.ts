import { Kernel, KernelMessage, KernelSpec } from '@jupyterlab/services';
import { KernelContext } from './kernel.types';

export async function executeSingleCode(
    kernel: Kernel.IKernelConnection,
    codes: string | string[]
): Promise<KernelMessage.IMessage[]> {
    const code = codes instanceof Array ? codes.join('\n') : String(codes);

    const results: KernelMessage.IMessage[] = await new Promise((resolve, reject) => {
        const collector: KernelMessage.IMessage[] = [];
        const iFuture = kernel.requestExecute({ code }, true);
        iFuture.onReply = (msg) => {
            collector.push(msg);
        };
        iFuture.onIOPub = (msg) => {
            collector.push(msg);
            if (KernelMessage.isErrorMsg(msg)) {
                reject(new Error(msg.content.ename));
            }
        };
        iFuture.done.then((value) => resolve(collector));
        iFuture.onStdin = (msg) => {
            if (msg.header.msg_type === 'input_request') {
                iFuture.dispose();
                reject('input request provided');
            }
            collector.push(msg);
        };
    });

    return results;
}

export function kernelContextToPython(context: KernelContext): string {
    const commands: string[] = ['import os'];
    return commands.concat(Object.keys(context).map((key) => `os.environ["${key}"]="${context[key]}"`)).join('\n');
}

export async function executeKernelContext(kernel: Kernel.IKernelConnection, kernelContext: KernelContext) {
    const code = kernelContextToPython(kernelContext);
    await executeSingleCode(kernel, code);
}

export function extractDefaultSpecName(kernelsSpec: KernelSpec.ISpecModels): string {
    const kernelsSpecs = Object.values(kernelsSpec.kernelspecs || {}) as KernelSpec.ISpecModel[];
    const hasDefault = !!kernelsSpec?.default && !!kernelsSpec?.kernelspecs?.[kernelsSpec?.default];
    return hasDefault ? kernelsSpec?.default : kernelsSpecs?.[0]?.name;
}

import Lumino from '../../lumino/Lumino';
import { useEffect, useMemo, useState } from 'react';
import { TerminalManager } from '@jupyterlab/services';
import { Terminal } from '@jupyterlab/terminal';

// TODO add console to connect to current kernel
export function TerminalComponent() {
    const [terminalWidget, setTerminalWidget] = useState<Terminal | null>(null);

    const manager = useMemo(() => {
        return new TerminalManager();
    }, []);

    useEffect(() => {
        manager?.startNew().then((terminalConnection) => {
            setTerminalWidget(new Terminal(terminalConnection, { theme: 'dark' }));
            // this.terminal.title.closable = true;
            // this.terminalPanel.addWidget(this.terminal);
        });
    }, [manager]);

    return <Lumino>{terminalWidget}</Lumino>;
}

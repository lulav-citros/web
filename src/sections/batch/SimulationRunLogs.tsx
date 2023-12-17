import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_SIMULATION_RUN_LOGS } from '../../graphQL/repos';
import { EditorProps as MonacoEditorProps } from '@monaco-editor/react';
import { CodeEditor, useCitrosMonacoTheme } from 'src/components/monaco';

export const options: MonacoEditorProps['options'] = {
    minimap: { enabled: false },
    // overviewRulerLanes: 0,
    scrollbar: {
        useShadows: true,
        verticalHasArrows: false,
        horizontalHasArrows: false,
        // vertical: 'hidden',
        horizontal: 'hidden',
        // handleMouseWheel: false,
        // alwaysConsumeMouseWheel: false,
        // scrollByPage: false,
    },
    scrollBeyondLastLine: false,
    // hideCursorInOverviewRuler: true,
    // overviewRulerBorder: false,
    // acceptSuggestionOnEnter: 'off',
    // codeLens: false,
    lineNumbers: 'off',
    wordWrap: 'on',
};

type Props = {
    batchRunId: string;
    simulationRunId: string;
};

export default function SimulationRunLogs({ batchRunId, simulationRunId }: Props) {
    useCitrosMonacoTheme();

    // Get the data from CiTROS GraphQL API
    const { loading, error, data, refetch } = useQuery(GET_SIMULATION_RUN_LOGS, {
        variables: { batchRunId: batchRunId, sid: parseInt(simulationRunId) },
    });
    if (error) {
        console.log('ERROR!', error);
    }

    const formatterConfig = {
        showTimestamp: true,
        showLogLevel: true,
        addNewLine: true,

        showPathName: false,
        showDetails: true,
    };

    // transform data to projects type
    const logs = useMemo(() => {
        if (data == undefined) {
            return '';
        }

        // console.log('simulation-runs logs:', loading, error, data);

        let log_list = '';

        if (!error && !loading) {
            for (let i = 0; i < data.getSimulationLogsList.length; i++) {
                // try{
                //     log_list = data.getSimulationLogsList[i].containerName + ":" + JSON.parse(data.getSimulationLogsList[i].log) + "\n" + log_list;
                // }catch(e){
                //     console.log("can parse log!!!")
                //     console.log(data.getSimulationLogsList[i].log)
                //     log_list = data.getSimulationLogsList[i].containerName + ":" + data.getSimulationLogsList[i].log + "\n" + log_list;
                // }
                log_list =
                    data.getSimulationLogsList[i].containerName +
                    ':' +
                    data.getSimulationLogsList[i].log +
                    '\n' +
                    log_list;
            }
        }
        return log_list;
    }, [data]);

    return (
        <CodeEditor
            fontSize={12}
            value={logs as string}
            onChange={function (value: string): void {}}
            readOnly={true}
            defaultLanguage="log"
        />
    );
}

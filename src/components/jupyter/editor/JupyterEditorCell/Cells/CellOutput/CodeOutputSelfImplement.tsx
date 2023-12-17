import { Box } from '@mui/material';
import { IOutput, isDisplayData, isDisplayUpdate, isError, isStream } from '@jupyterlab/nbformat';

const removeANSIEscapeRegex = /[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g;

interface CodeOutputSelfImplementProps {
    outputs: IOutput[];
}

// @deprecated instead using lumino jupyter output
function CodeOutputSelfImplement({ outputs }: CodeOutputSelfImplementProps) {
    return (
        <Box
            sx={{
                flexDirection: 'column',
                overflowX: 'auto',
                py: 2,
                mb: outputs.length ? 2 : 0,
            }}
        >
            {outputs.map((output, index) => {
                if (isError(output)) {
                    return (
                        <Box key={index}>
                            <pre>{output.traceback.join('\n').replace(removeANSIEscapeRegex, '')}</pre>
                        </Box>
                    );
                } else if (isDisplayData(output)) {
                    const data = output.data;
                    // TODO beautify
                    return (
                        <Box key={index}>
                            <Box
                                component={'img'}
                                alt={'asd'}
                                src={'data:image/png;base64, ' + (data['image/png'] || data['image/jpg'] || '')}
                            />
                        </Box>
                    );
                } else if (isStream(output)) {
                    return (
                        <Box key={index}>
                            {output.text instanceof Array ? (
                                output.text.map((text) => <pre>{text}</pre>)
                            ) : (
                                <pre>{output.text}</pre>
                            )}
                        </Box>
                    );
                } else if (isDisplayUpdate(output)) {
                    return <>{output.data}</>;
                }

                return (
                    <Box key={index}>
                        <>{output.text}</>
                    </Box>
                );
            })}
        </Box>
    );
}

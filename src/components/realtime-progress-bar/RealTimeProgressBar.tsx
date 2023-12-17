import dynamic from 'next/dynamic';
import { useState, useEffect, useRef } from 'react';
import { LinearProgress, Tooltip } from '@mui/material';

export type RealTimeProgressBarData = {
    milliseconds?: number;
    data: number[];
    sx: Object;
};

export default function RealTimeProgressBar({ data, sx, milliseconds = 1000 }: RealTimeProgressBarData) {
    const [progress, setProgress] = useState(0);

    // console.log('data', data);

    useEffect(() => {
        const generateProgressData = async () => {
            if (data) {
                const newProgress = data && data.length > 0 ? data[0] : 0;
                console.log(newProgress);

                data.shift();
                setProgress(newProgress);
            }
        };

        const timer = setInterval(() => generateProgressData(), milliseconds);

        return () => {
            clearInterval(timer);
        };
    }, [data, progress, milliseconds]);

    return (
        <Tooltip title={progress} arrow>
            <LinearProgress variant="determinate" value={progress} sx={sx} />
        </Tooltip>
    );
}

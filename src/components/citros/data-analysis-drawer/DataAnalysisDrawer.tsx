import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import DraggableDrawer from '../../drawer/DraggableDrawer';
import DataAnalysisDrawerHeader from './DataAnalysisDrawerHeader';
import SimulationBatchRunsListPage from 'src/pages/batch';
import BatchRunsList from '../batch/BatchRunsList';
import Iconify from 'src/components/iconify';

interface DataAnalysisDrawerComponentProps {
    repoName?: string;
}

export default function DataAnalysisDrawerComponent({ repoName }: DataAnalysisDrawerComponentProps) {
    const [DataAnalysisOpen, setDataAnalysisOpen] = useState(false);

    return (
        <>
            {/* <Button variant="contained" color="info" onClick={() => setDataAnalysisOpen(true)}>
                DataAnalysis
            </Button> */}
            <Tooltip title="batch runs wizard">
                <IconButton onClick={() => setDataAnalysisOpen(true)} color="primary">
                    <Iconify icon="carbon:data-view" />
                </IconButton>
            </Tooltip>

            <DraggableDrawer
                NavChildren={<DataAnalysisDrawerHeader></DataAnalysisDrawerHeader>}
                open={DataAnalysisOpen}
                setOpen={setDataAnalysisOpen}
                defaultDrawerWidth={900}
                minDrawerWidth={700}
                maxDrawerWidth={1500}
                backgroundBlur={false}
            >
                <BatchRunsList repoName={repoName}></BatchRunsList>;
            </DraggableDrawer>
        </>
    );
}

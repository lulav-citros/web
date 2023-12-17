import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import DraggableDrawer from '../drawer/DraggableDrawer';
import DataAnalysisDrawerHeader from './SnippetsDrawerHeader';
import SimulationBatchRunsListPage from 'src/pages/batch';
import { Snippets } from './Snippets';
import Iconify from 'src/components/iconify';

interface DataAnalysisDrawerComponentProps {
    repoName?: string;
}

export default function SnippetsDrawerComponent({ repoName }: DataAnalysisDrawerComponentProps) {
    const [DataAnalysisOpen, setDataAnalysisOpen] = useState(false);

    return (
        <>
            <Tooltip title="data analysis code snippets wizard">
                <IconButton onClick={() => setDataAnalysisOpen(true)} color="primary">
                    <Iconify icon="pajamas:doc-code" />
                </IconButton>
            </Tooltip>

            <DraggableDrawer
                NavChildren={<DataAnalysisDrawerHeader></DataAnalysisDrawerHeader>}
                open={DataAnalysisOpen}
                setOpen={setDataAnalysisOpen}
                defaultDrawerWidth={700}
                minDrawerWidth={350}
                maxDrawerWidth={1500}
                backgroundBlur={true}
                backgroundBlurbackgroundColor="transparent"
            >
                <Snippets />
            </DraggableDrawer>
        </>
    );
}

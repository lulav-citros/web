import React, { useState, useEffect, useRef } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import DraggableDrawer from '../drawer/DraggableDrawer';
import DocumentationDrawerHeader from './DocumentationDrawerHeader';
import Iconify from '../iconify';

interface DocumentationDrawerComponentProps {
    NavChildren: React.ReactNode;
    iframeLink: string;
}

export default function DocumentationDrawerComponent({
    NavChildren = DocumentationDrawerHeader(),
    iframeLink,
}: DocumentationDrawerComponentProps) {
    const [documentationOpen, setDocumentationOpen] = React.useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const [navHeight, setNavHeight] = useState(0);


    // console.log("iframeLink", iframeLink);
    useEffect(() => {
        if (navRef.current) {
            setNavHeight(navRef.current.offsetHeight);
        }
    }, [documentationOpen]);

    return (
        <>
            {/* <Button variant="contained" color="info" onClick={() => setDocumentationOpen(true)}>
                Documentation
            </Button> */}
            <Tooltip title="Documentation">
                <IconButton onClick={() => setDocumentationOpen(true)} color='primary'>
                    <Iconify icon="fluent-mdl2:documentation" />
                </IconButton>
            </Tooltip>


            <DraggableDrawer
                NavChildren={<div ref={navRef}>{NavChildren}</div>}
                open={documentationOpen}
                setOpen={setDocumentationOpen}
                defaultDrawerWidth={900}
                minDrawerWidth={500}
                maxDrawerWidth={1500}
                backgroundBlur={false}
            >
                <iframe
                    src={iframeLink}
                    style={{ width: '100%', height: `calc(100vh - ${navHeight}px - 39px)`, border: 'none' }}
                ></iframe>
            </DraggableDrawer>
        </>
    );
}

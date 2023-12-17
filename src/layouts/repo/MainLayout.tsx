import { useMemo, useState } from 'react';
import { Box, Divider, IconButton } from '@mui/material';
import AuthGuard from '../../auth/AuthGuard';
import Main from './Main';
import Header from './header';
import NavLocal from './nav/NavLocal';
import { useRouter } from 'next/router';
import generateConfig from './config/main';
import DocumentationFab from 'src/components/documentation-fab/DocumentationFab';

type Props = {
    children?: React.ReactNode;
    hideHeader?: boolean;
};

export default function MainLayout({ children, hideHeader }: Props) {
    const { query } = useRouter();

    const [open, setOpen] = useState(false);

    const navConfigItems = useMemo(() => {
        return generateConfig(query.repo_name as string);
    }, [query]);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <AuthGuard>
            <>
                <Header onOpenNav={handleOpen} />

                <Main>
                    <NavLocal navConfigItems={navConfigItems} />
                    <Divider></Divider>
                    {children}
                </Main>
                <DocumentationFab />
            </>
        </AuthGuard>
    );
}

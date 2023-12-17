import { useState } from 'react';
// @mui
import { Button, Divider, IconButton, MenuItem, Tooltip, Link, Typography } from '@mui/material';
import MenuPopover from 'src/components/menu-popover';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

type Props = {
    tootltip: string;
    href?: string;
    text: string;
};

export default function TableButton({ tootltip, href, text }: Props) {
    const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

    const handleOpenPopover = (event: React.MouseEvent<HTMLElement>) => {
        setOpenPopover(event.currentTarget);
    };

    const handleClosePopover = () => {
        setOpenPopover(null);
    };

    const [onDeleteDialogOpen, setOnDeleteDialogOpen] = useState<boolean>(false);

    if (!href) {
        return <Typography variant="body2">{text}</Typography>;
    }
    return (
        <>
            <Tooltip title={tootltip}>
                <Typography variant="body2">
                    <Link href={href} underline="none">
                        {text}
                    </Link>{' '}
                </Typography>
                {/* <Button
                    // sx={{ minWidth: '100%' }}
                    style={{ textTransform: 'none', overflow: 'hidden' }}
                    size="small"
                    variant={'text'}
                    href={href}       
                    color={href?'primary':'inherit'}             
                >
                    {text}
                </Button> */}
            </Tooltip>
        </>
    );
}

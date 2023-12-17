import { Box, Chip, CircularProgress, IconButton, Link, Stack, Tooltip, Typography } from '@mui/material';
import Iconify from 'src/components/iconify/Iconify';
import { fDateTimeShort, fToNow } from 'src/utils/formatTime';
import { IBrowserItem } from './types';
import { PATH_DATA, PATH_REPO } from 'src/routes/paths';
import { useMemo } from 'react';
import { downloadFileFromBucket } from './utils';
import useCopyToClipboard from 'src/hooks/useCopyToClipboard';
import { useSnackbar } from 'src/components/snackbar';
import { fSize } from 'src/utils/formatNumber';

type Props = {
    item: IBrowserItem;
    repoName?: string;
};

export function RowItem({ item, repoName }: Props) {
    // const { copy } = useCopyToClipboard();
    // const { enqueueSnackbar } = useSnackbar();

    if (item.filename === '') {
        return <></>;
    }

    const fileLink = useMemo(() => {
        // File:  if the file is a file we can download it.
        if (!item.idFolder) {
            return (
                <Box display={'flex'}  gap={1} sx={{minWidth: '200px', maxWidth: '500px'}}>
                    <Iconify icon={'mdi:file-outline'} />
                    <Link onClick={() => downloadFileFromBucket(item.name)}>
                        {item.idFolder ? `${item.filename}/` : item.filename}
                    </Link>
                </Box>
            );
        }

        // Folder.
        let url = PATH_DATA.view(item.name);
        if (repoName) {
            url = PATH_REPO.data(repoName, item.name.split('/').slice(1).join('/'));
        }
        return (
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Iconify icon={'ion:folder-outline'} />

                <Link href={url}>{item.idFolder ? `${item.filename}/` : item.filename}</Link>
            </Box>
        );
    }, [repoName, item]);

    return (
        <Box
            key={item.id}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.800',
                padding: 2,
                ':hover': {
                    // cursor: 'pointer',
                    backgroundColor: 'grey.850',
                },                
            }}
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
        >
            {fileLink}

            { !item.idFolder && <Typography variant="body2" sx={{ alignContent: 'right' }}>
                {fSize(item.size || 0)}
            </Typography> }
            
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Typography variant="body2" sx={{ alignContent: 'right' }}>
                    {fToNow(Date.parse(item.timeCreated as string))}
                </Typography>
                {/* <Typography variant="body2" sx={{ alignContent: 'right' }}>
                    {fToNow(Date.parse(item.updated as string))}
                </Typography> */}
            </Box>
        </Box>
    );
}

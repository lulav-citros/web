import { Box, Link, Stack, Typography, Chip } from '@mui/material';
import { paramCase } from 'change-case';
import { NotificationObj } from '../notification';
import { PATH_REPO } from 'src/routes/paths';
import { fDateTimeShort } from 'src/utils/formatTime';
import { Button } from '@jupyterlab/ui-components';
import Iconify from 'src/components/iconify';

type Props = {
    notification: NotificationObj;
    onNotificationClickHandler: (id: string, url: string) => void;
};
export function NotificationRow({ notification, onNotificationClickHandler }: Props) {
    return (
        <Box key={notification.id} sx={{ borderBottom: 0.5, borderColor: 'grey.800', padding: 2 }}>
            <Link onClick={() => onNotificationClickHandler(notification.id, notification.url)}>
                <Typography variant="h5">
                    <Iconify sx={{ mr: 1 }} icon="eva:done-all-fill" color={notification.isUnRead ? 'green' : 'gray'} />

                    {notification.title}
                </Typography>
            </Link>

            <Typography variant="body1">{notification.description}</Typography>

            <Chip label={notification.type} color={'success'} variant="outlined" size="small" />

            <Stack direction="row" spacing={1} sx={{ paddingTop: 1 }}>
                {/* <Box>{notification.id}</Box> */}

                {/* <Chip label={notification.title} color={"primary"} variant='outlined' size='small' /> */}
                <Box>{notification.isUnRead}</Box>
                <Box>{fDateTimeShort(notification.createdAt)}</Box>
            </Stack>
        </Box>
    );
}

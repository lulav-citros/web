import { Box, Chip, Link, Stack, Typography } from '@mui/material';
import { Repo } from 'src/@types/repo';
import Iconify from 'src/components/iconify/Iconify';
import { PATH_REPO } from 'src/routes/paths';

type Props = {
    repo: Repo;
};
export function RepoRow({ repo }: Props) {
    return (
        <Box
            key={repo.id}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.800',
                padding: 2,
                ':hover': {
                    // cursor: 'pointer',
                    backgroundColor: 'grey.850',
                },
            }}
            // onClick={() => {
            //     push(PATH_REPO.view(repo.name));
            // }}
        >
            <Stack direction="row">
                <Typography variant="h1">
                    <Link
                        href={PATH_REPO.view(repo.name)}
                        // passHref
                        // style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}
                    >
                        {repo.name}
                    </Link>
                </Typography>
            </Stack>

            {repo.description && <Typography variant="body2">{repo.description}</Typography>}

            <Stack direction="row" spacing={1} sx={{ paddingTop: 1 }}>
                {/* <Box>{repo.id}</Box> */}
                {/* <Box>{paramCase(repo.name)}</Box> */}
                {/* <Box> */}

                <Chip
                    sx={{ ml: 1 }}
                    // color="warning"
                    size="small"
                    variant="outlined"
                    label={
                        <Stack direction={'row'} spacing={0.5}>
                            <Iconify icon="mdi:user-outline" color="gray.100" sx={{ pt: '1px', pb: '1px' }} />

                            <Typography variant="caption" color="text.secondary">
                                {repo.user && repo.user.email}
                            </Typography>
                        </Stack>
                    }
                ></Chip>

                <Chip
                    sx={{ ml: 1 }}
                    // color="warning"
                    size="small"
                    variant="outlined"
                    label={
                        <Stack direction={'row'} spacing={0.5}>
                            <Stack direction="row" spacing={0.5}>
                                <Iconify
                                    icon="mdi:success-circle-outline"
                                    color="gray.100"
                                    // width={14}
                                    sx={{ pt: '1px', pb: '1px' }}
                                />
                                <Typography variant="caption" color="text.secondary">
                                    {repo.batchRunsCount}
                                </Typography>
                            </Stack>

                            <Stack direction="row" spacing={0.5}>
                                <Iconify icon="codicon:error" color="gray.800" sx={{ pt: '1px', pb: '1px' }} />
                                <Typography variant="caption" color="text.secondary">
                                    {repo.batchRunsCount - repo.batchRunsCountDone}
                                </Typography>
                            </Stack>
                        </Stack>
                    }
                ></Chip>
            </Stack>
        </Box>
    );
}

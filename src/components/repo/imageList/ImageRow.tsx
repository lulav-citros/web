import { Box, Link, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { Image } from 'src/@types/registry';
import Iconify from 'src/components/iconify/Iconify';
import { PATH_REPO } from 'src/routes/paths';
import { fToNow } from 'src/utils/formatTime';

type Props = {
    image: Image;
    repoName: string;
};
export function ImageRow({ image, repoName }: Props) {
    const router = useRouter();
    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            key={image.name}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.800',
                padding: 1,
                pl: 2,
                ':hover': {
                    cursor: 'pointer',
                    backgroundColor: 'grey.850',
                },
            }}
            onClick={() => {
                router.push(PATH_REPO.image(image.displayName));
            }}
        >
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Iconify icon={'teenyicons:docker-outline'} width={16} />
                <Typography variant="body2">
                    <Link
                        href={PATH_REPO.image(image.displayName)}
                        // passHref
                        // style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}
                    >
                        {image.displayName}
                    </Link>
                </Typography>
            </Box>
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Typography minWidth={100} variant="body2">
                    {fToNow(parseInt(image.createTime.seconds as string) * 1000)}
                </Typography>
                {/* <Typography minWidth={100} variant="body2">
                    {fToNow(parseInt(image.updateTime.seconds as string) * 1000)}
                </Typography> */}
            </Box>
        </Box>
    );
}

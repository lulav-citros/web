import { Box, Chip, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { ImageDigest } from 'src/@types/registry';
import { fToNow } from 'src/utils/formatTime';

type Props = {
    imageDigest: ImageDigest;
    repoName: string;
};
export function ImageDigestRow({ imageDigest, repoName }: Props) {
    const router = useRouter();
    return (
        <Box
            display={'flex'}
            justifyContent={'space-between'}
            gap={1}
            key={imageDigest.name}
            sx={{
                borderBottom: 0.5,
                borderColor: 'grey.800',
                padding: 1,
                pl: 2,
                // ':hover': {
                //     cursor: 'pointer',
                //     backgroundColor: 'grey.850',
                // },
            }}
            // onClick={() => {
            //     router.push(PATH_REPO.image(repoName, (digest.name || '').split('/').pop()));
            // }}
        >
            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                {/* <Iconify icon={'teenyicons:docker-outline'} width={16} /> */}
                <Typography variant="body2">{imageDigest.name.split(':')[1].slice(0, 12)}</Typography>
            </Box>

            <Box  justifyContent={'space-between'} gap={1} sx={{ maxWidth:'800px' }}>
                {/* <Iconify icon={'teenyicons:docker-outline'} width={16} /> */}
                {imageDigest.relatedTags.map((tag) => {
                    return (
                        <Chip
                            key={tag.name}
                            size="small"
                            label={<Typography variant="body2">{tag.name.split('/').pop()}</Typography>}
                        />
                    );
                })}
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <Typography minWidth={100} variant="body2">
                    {fToNow(parseInt(imageDigest.createTime.seconds as string) * 1000)}
                </Typography>
                {/* <Typography minWidth={100} variant="body2">
                    {fToNow(parseInt(imageDigest.updateTime.seconds as string) * 1000)}
                </Typography> */}
            </Box>
        </Box>
    );
}

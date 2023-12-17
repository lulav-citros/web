import React from 'react';
import { Typography, Box } from '@mui/material';
import { useQuery } from '@apollo/client';
import { GET_SSH_KEYS } from '../../../../graphQL/sshKeys';
import { SshKeyRowFooter } from 'src/components/citros/ssh-key/SshKeyRowFooter';
import { SshKeyRow } from 'src/components/citros/ssh-key/SshKeyRow';
import { SshKeyRowHeader } from 'src/components/citros/ssh-key/SshKeyRowHeader';
import LoaderOverWidget from 'src/components/loaderOverWidget';
import { SSHKey } from 'src/components/citros/ssh-key/types';

// ----------------------------------------------------------------------

export default function AccountSSHKeys() {
    const { loading, error, data, refetch } = useQuery(GET_SSH_KEYS);
    if (error) {
        console.log('ERROR!', error);
    }
    if (loading) {
        return (
            <LoaderOverWidget/>
        );
    }

    return (
        <>
            <SshKeyRowHeader refetch={refetch} />

            {data?.sshKeysList.length > 0 && (
                <Box sx={{ mx: 5, pt: 1, border: 1, borderColor: 'grey.800', borderRadius: 1, overflow: 'hidden' }}>
                    {data?.sshKeysList.map((sshKey: SSHKey, index: number) => {
                        return <SshKeyRow sshKey={sshKey} refetch={refetch} key={index}></SshKeyRow>;
                    })}
                </Box>
            )}
            <SshKeyRowFooter />
        </>
    );
}

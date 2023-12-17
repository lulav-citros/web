import React, { useMemo } from 'react';
import { useCommitEditorContext } from '../CommitEditorContext';
import { getChildGitTree } from '../file.utils';
import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import Iconify from '../../../../iconify';
import NextLink from 'next/link';
import { PATH_REPO } from '../../../../../routes/paths';

export function TreeTable() {
    const { fileRoute, gitRepository } = useCommitEditorContext();

    const { repoName, folders, branch } = fileRoute;

    const items = useMemo(() => {
        const gitRepositoryDrilled = getChildGitTree(folders, gitRepository || {});

        return Object.values(gitRepositoryDrilled);
    }, [folders, gitRepository]);

    return (
        <Table sx={{ border: 1, borderColor: 'grey.800', borderRadius: 1 }}>
            <TableHead sx={{ borderBottom: 0.1, borderColor: 'grey.700' }}>
                <TableRow>
                    <TableCell sx={{ padding: 1, color: 'grey.500', backgroundColor: 'grey.850' }}>Type</TableCell>
                    <TableCell sx={{ padding: 1, color: 'grey.500', backgroundColor: 'grey.850' }}>Name</TableCell>
                    <TableCell sx={{ padding: 1, color: 'grey.500', backgroundColor: 'grey.850' }}>Path</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item) => {
                    return (
                        <TableRow
                            key={item.name}
                            sx={{
                                borderBottom: 0.1,
                                borderColor: 'grey.700',
                                ':hover': { backgroundColor: 'grey.850' },
                            }}
                        >
                            <TableCell sx={{ color: 'grey.400', p: 1 }} width={20}>
                                {item.type === 'blob' ? (
                                    <Iconify icon={'mdi:file-outline'} />
                                ) : item.type === 'tree' ? (
                                    <Iconify icon={'ion:folder-outline'} />
                                ) : null}
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Link
                                    component={NextLink}
                                    href={
                                        item.type === 'tree'
                                            ? PATH_REPO.tree(repoName, branch, item.path)
                                            : PATH_REPO.blob(repoName, branch, item.path)
                                    }
                                    passHref
                                >
                                    {item.name}
                                </Link>
                            </TableCell>
                            <TableCell sx={{ p: 1 }}>
                                <Link
                                    component={NextLink}
                                    href={
                                        item.type === 'tree'
                                            ? PATH_REPO.tree(repoName, branch, item.path)
                                            : PATH_REPO.blob(repoName, branch, item.path)
                                    }
                                    passHref
                                >
                                    {item.path}
                                </Link>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

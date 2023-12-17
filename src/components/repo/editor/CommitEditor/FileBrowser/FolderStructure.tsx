import React, { useState } from 'react';
import {
    Autocomplete,
    Box,
    Collapse,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
} from '@mui/material';
import { GitRepository, GitTree } from '../../../gitolite.types';
import Iconify from '../../../../iconify';
import Link from 'next/link';
import { PATH_REPO } from 'src/routes/paths';
import { useRouter } from 'next/router';

import { useCommitEditorContext } from '../CommitEditorContext';
import { ChangeBranch } from '../FileDisplay/Toolbar/components/ChangeBranch';

interface FolderStructureProps {
    data: GitRepository;
    currentPath: string; // Add currentPath as a prop
    repoName: string;
    branch: string;
}

function getInitialState(currentPath: string) {
    return () => {
        const initialOpenState: { [path: string]: boolean } = {};
        // console.log("currentPath", currentPath);
        // Function to populate initialOpenState based on the current path
        const populateInitialState = (path: string) => {
            if (path === '') return initialOpenState;
            const pathSegments = path.split('/');
            let currentPath = '';
            pathSegments.forEach((segment) => {
                currentPath += `${segment}`;
                initialOpenState[currentPath] = true;
            });
            return initialOpenState;
        };

        return populateInitialState(currentPath);
    };
}

const FolderStructure: React.FC<FolderStructureProps> = ({ data, currentPath, repoName, branch }) => {
    const [openFolders, setOpenFolders] = React.useState<{ [path: string]: boolean }>(getInitialState(currentPath));
    const [filter, setFilter] = useState('');
    const route = useRouter();

    const { isFolder } = useCommitEditorContext();

    const handleClick: any = (path: string, isFolder: boolean) => {
        setOpenFolders((prevState) => ({
            ...prevState,
            [path]: !prevState[path],
        }));
        route.push(isFolder ? PATH_REPO.tree(repoName, branch, path) : PATH_REPO.blob(repoName, branch, path));
    };

    return (
        <Box>
            <Box display={'flex'} justifyContent={'space-between'} gap={1} sx={{ pb: 1 }}>

                <ChangeBranch/>

                {/* <IconButton
                    size={'small'}
                    type={'button'}
                    color={'inherit'}
                    sx={{ height: '40px', border: '1px solid', borderColor: 'grey.500', borderRadius: '0.5rem' }}
                >
                    <Iconify icon={'mdi:add'} />
                </IconButton> */}
            </Box>

            <Box display={'flex'} justifyContent={'space-between'} gap={1}>
                <TextField
                    placeholder={'search for file...'}
                    size={'small'}
                    sx={{ flex: 1 }}
                    onChange={(event) => setFilter(event.target.value)}
                    inputProps={{ style: { height: '16px' } }}
                />
            </Box>
            <TreeItem
                branch={branch}
                items={data}
                onClick={handleClick}
                currentPath={currentPath}
                repoName={repoName}
                openFolders={openFolders}
                filter={filter}
            />
        </Box>
    );
};

function TreeItem({
    items,
    branch,
    basePath = '',
    level = 0,
    currentPath,
    onClick,
    repoName,
    openFolders,
    filter,
}: {
    items: GitRepository;
    branch: string;
    basePath?: string;
    level?: number;
    currentPath: string;
    onClick: (path: string, isFolder: boolean) => void;
    repoName: string;
    openFolders: Record<string, boolean>;
    filter?: string;
}) {
    let strings = Object.keys(items);
    if (filter) {
        strings = strings.filter((key) => {
            const item = items[key];
            const isFolder = item.type === 'tree';
            return isFolder || key.includes(filter);
        });
    }

    return (
        <List disablePadding>
            {strings.map((key) => {
                const item = items[key];
                const itemPath = basePath === '' ? key : `${basePath}/${key}`;
                const isFolder = item.type === 'tree';

                return (
                    <div key={itemPath}>
                        <Stack direction={'row'} flex={1}>
                            <Box
                                sx={{
                                    width: 5,
                                    borderRadius: 2,
                                    backgroundColor: itemPath === currentPath ? 'green' : 'transparent',
                                }}
                            />

                            <ListItemButton
                                key={itemPath}
                                onClick={() => onClick(itemPath, isFolder)}
                                selected={itemPath === currentPath}
                                sx={{
                                    // borderLeft: itemPath === currentPath ? 2 : 0,
                                    borderRadius: 1,
                                    pl: level * 3.5,
                                    py: 0.25,
                                    color: 'grey.400',
                                }}
                            >
                                {isFolder &&
                                    (openFolders[itemPath] ? (
                                        <Iconify icon="octicon:chevron-down-24" sx={{ height: 16, width: 16 }} />
                                    ) : (
                                        <Iconify icon="octicon:chevron-right-24" sx={{ height: 16, width: 16 }} />
                                    ))}

                                <ListItemIcon sx={{ p: 0, pl: 0.5, mr: 0.5 }}>
                                    {isFolder ? (
                                        <Iconify icon={'ion:folder-outline'} sx={{ height: 16, width: 16 }} />
                                    ) : (
                                        <Iconify icon={'mdi:file-outline'} sx={{ height: 16, width: 16 }} />
                                    )}
                                </ListItemIcon>

                                <ListItemText
                                    sx={{ p: 0.5, fontSize: '2.9rem' }}
                                    primary={
                                        <Link
                                            href={
                                                isFolder
                                                    ? PATH_REPO.tree(repoName, branch, itemPath)
                                                    : PATH_REPO.blob(repoName, branch, itemPath)
                                            }
                                            passHref
                                            style={{ color: 'inherit', textDecoration: 'none', fontSize: '0.9rem' }}
                                        >
                                            {key}
                                        </Link>
                                    }
                                />
                            </ListItemButton>
                        </Stack>

                        {isFolder && openFolders[itemPath] && (
                            <Collapse in={openFolders[itemPath]} timeout="auto" unmountOnExit>
                                <TreeItem
                                    branch={branch}
                                    items={(item as GitTree).children}
                                    basePath={itemPath}
                                    currentPath={currentPath}
                                    level={level + 1}
                                    onClick={onClick}
                                    repoName={repoName}
                                    openFolders={openFolders}
                                    filter={filter}
                                />
                            </Collapse>
                        )}
                    </div>
                );
            })}
        </List>
    );
}

export default FolderStructure;

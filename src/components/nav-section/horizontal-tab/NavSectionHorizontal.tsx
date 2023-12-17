import { memo, useState } from 'react';
import { Stack, Tab, Tabs } from '@mui/material';
import { hideScrollbarY } from '../../../utils/cssStyles';
import { SmallNavSectionProps, NavListProps } from '../types';
import NavList from './NavList';
import { useRouter } from 'next/router';

function NavSectionHorizontal({ items, sx }: SmallNavSectionProps) {
    const route = useRouter();
    const folders = route.asPath.split('/');

    // console.log("route.folders", route, route.pathname, folders);

    let section = route.pathname;

    let boolVar = items.some((value) => {
        return section == value.pathname;
    });

    // console.log("section.includes('/batch]') ", section.includes('/batch]'), section )
    if (!boolVar) {
        if (section.includes('/batch')) {
            section = '/batch';
        } else {
            section = '/[repo_name]';
        }
        // section = '/[repo_name]'
    }

    return (
        <Tabs
            value={section}
            sx={{
                // mx: 'auto',
                ...hideScrollbarY,
                ...sx,
            }}
        >
            {items.map((tab) => (
                // <Items key={group.subheader} items={group.items} />
                <Tab
                    onClick={() => route.push(`${tab.path}`)}
                    key={tab.title.toLocaleLowerCase()}
                    icon={tab.icon}
                    label={tab.title}
                    value={tab.pathname}
                    disabled={tab.disabled}
                />
            ))}
        </Tabs>
    );
}

export default memo(NavSectionHorizontal);

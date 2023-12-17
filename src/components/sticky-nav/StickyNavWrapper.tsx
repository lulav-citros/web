import { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Box } from '@mui/material';

export interface StickyContextType {
    isSticky: boolean;
}

export const StickyContext = createContext<StickyContextType>({
    isSticky: false,
});

export function useIsSticky(): boolean {
    return useContext(StickyContext).isSticky;
}

interface StickyState {
    isSticky: boolean;
    sidebarHeight?: number;
    leftOffset: number;
    originalWidth?: number;
}

export function StickyNavWrapper({ children, topOffset }: PropsWithChildren<{ topOffset?: number }>) {
    const ref = useRef<HTMLDivElement>(null);
    const [{ isSticky, sidebarHeight, leftOffset, originalWidth }, setState] = useState<StickyState>({
        isSticky: false,
        leftOffset: 0,
    });

    const handleScrollEvent = useCallback(() => {
        if (!ref.current) return;
        const sidebarEl = ref.current?.getBoundingClientRect();
        const scrollValue = window.scrollY;
        const sidebarTop = sidebarEl.top;
        const currentSidebarHeight = sidebarEl?.height || 0;

        // const isSticky = scrollValue >= sidebarTop + currentSidebarHeight * 2 + 30;
        const isSticky = sidebarTop < 0;

        setState({
            isSticky,
            sidebarHeight: currentSidebarHeight,
            leftOffset: sidebarEl.left || 0,
            originalWidth: sidebarEl.width || undefined,
        });
    }, [ref.current]);

    useEffect(() => {
        window.addEventListener('scroll', handleScrollEvent);
        return () => {
            window.removeEventListener('scroll', handleScrollEvent);
        };
    }, []);

    return (
        <StickyContext.Provider
            value={useMemo(
                () => ({
                    isSticky,
                }),
                [isSticky]
            )}
        >
            <Box ref={ref} sx={{ position: 'relative', height: sidebarHeight }}>
                <Box
                    sx={{
                        m: 0,
                        p: 0,
                        ...(isSticky
                            ? {
                                  position: 'fixed',
                                  width: originalWidth != null ? originalWidth : 'auto',
                                  top: topOffset || 0,
                                  left: leftOffset,
                                  zIndex: 500,
                                  borderRadius: '2rem',
                              }
                            : {}),
                    }}
                >
                    {children}
                </Box>
            </Box>
        </StickyContext.Provider>
    );
}

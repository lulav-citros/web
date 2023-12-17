import { Components, Theme } from '@mui/material/styles';
//
import { InputSelectIcon } from './CustomIcons';

// ----------------------------------------------------------------------

export default function Select(theme: Theme): Components {
    return {
        MuiSelect: {
            defaultProps: {
                IconComponent: InputSelectIcon,
            },
            variants: [
                {
                    props: { size: 'small' },
                    style: {
                        fontSize: '0.6rem',
                        lineHeight: '0.8rem',
                    },
                },
            ],
        },
    };
}

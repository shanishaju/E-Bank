import { TextField } from '@mui/material';
import React from 'react';

const TextBox = React.forwardRef((props, ref) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            size="small"
            inputRef={ref}
            sx={{
                '& .MuiOutlinedInput-root': {
                    borderRadius: 0,
                    '&.Mui-focused fieldset': {
                        borderColor: 'goldenrod',
                    },
                    '& input': {
                        padding: '6px 10px',
                    },
                },
                '& .MuiInputLabel-root': {
                    fontSize: '0.9rem',
                },
                '& .MuiInputLabel-root.Mui-focused': {
                    color: 'goldenrod',
                },
            }}
            {...props}
        />
    );
});

export default TextBox;

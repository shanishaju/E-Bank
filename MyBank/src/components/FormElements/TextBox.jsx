import { TextField } from '@mui/material'
import React from 'react'

const TextBox = React.forwardRef((props, ref) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            inputRef={ref}
            sx={{
                '& .MuiOutlinedInput-root': {

                    '&.Mui-focused fieldset': {
                        borderColor: 'green',
                    },
                },
            }}
            {...props}
        />
    );
});


export default TextBox

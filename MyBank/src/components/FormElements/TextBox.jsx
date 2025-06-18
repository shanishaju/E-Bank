import { TextField } from '@mui/material'
import React from 'react'

const TextBox = React.forwardRef((props, ref) => {
    return (
        <TextField
            variant="outlined"
            fullWidth
            inputRef={ref} 
            {...props}
        />
    );
});


export default TextBox

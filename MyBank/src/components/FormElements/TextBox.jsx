import { TextField } from '@mui/material'
import React from 'react'

function TextBox(props) {
    return (
        <TextField
            variant="outlined"
            fullWidth
            {...props}
        >
        </TextField>
    )
}

export default TextBox

// import { TextField } from '@mui/material'
// import React from 'react'

// const TextBox = React.forwardRef((props, ref) => {
//     return (
//         <TextField
//             variant="outlined"
//             fullWidth
//             inputRef={ref}
//             sx={{
//                 '& .MuiOutlinedInput-root': {

//                     '&.Mui-focused fieldset': {
//                         borderColor: 'green',
//                     },
//                 },
//             }}
//             {...props}
//         />
//     );
// });


// export default TextBox


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
                    borderRadius: 0, // sharp edges
                    '&.Mui-focused fieldset': {
                        borderColor: 'green',
                    },
                    '& input': {
                        padding: '6px 10px', // smaller height
                    },
                },
                '& .MuiInputLabel-root': {
                    fontSize: '0.9rem',
                },
            }}
            {...props}
        />
    );
});

export default TextBox;

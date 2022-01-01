import { FormControl, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const MarginInput = (props)=>{
    return (
        <FormControl sx={{margin:'1rem'}}>
            <TextField 
                size='small' 
                variant='standard' 
                type='number' 
                label='Taux de marge' 
                name='margin' 
                value={props.data.margin} 
                onChange={props.callBack} 
                InputProps={{
                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                }}
                inputProps={{
                    min: 0
                }}
            />
        </FormControl>
    )
}

export default MarginInput;
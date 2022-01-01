import { FormControl, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import React from 'react';

const GrossInput = (props)=>{
    return (
        <FormControl sx={{margin:'1rem'}}>
            <RadioGroup row label='Période de rémunération' name='gross-period' value={props.data.gross.period} onChange={props.callBack}>
                <FormControlLabel value='daily' control={<Radio/>} label='Prix de vente journalier' />
                <FormControlLabel value='total' control={<Radio/>} label='Prix de vente total' />
            </RadioGroup>
            <TextField 
                size='small' 
                variant='standard' 
                type='number' 
                label='Prix de vente / Budget client' 
                name='gross-amount' 
                value={props.data.gross.amount} 
                onChange={props.callBack} 
                InputProps={{
                    endAdornment: <InputAdornment position="end">EUR</InputAdornment>,
                  }}
                inputProps={{
                    min: 0
                }}
            />
            
        </FormControl>
    )
}

export default GrossInput;
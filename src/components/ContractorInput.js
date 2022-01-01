import { FormControl, InputAdornment, TextField } from '@mui/material';
import React from 'react';

const ContractorInput = (props)=>{
    return (
        <FormControl sx={{margin:'1rem'}}>
            
            <TextField 
                size='small' 
                margin='dense'
                variant='standard' 
                type='number' 
                label='Taux Journalier Moyen' 
                name='daily-cost' 
                value={props.data.contractorCosts.amount} 
                onChange={props.callBack} 
                InputProps={{
                    endAdornment: <InputAdornment position="end">TJM en EUR</InputAdornment>,
                }}
                inputProps={{
                    min: 0
                }}
            />
            <TextField 
                size='small' 
                margin='dense'
                variant='standard' 
                type='number' 
                label='Frais additionnels' 
                name='additional-cost' 
                value={props.data.contractorCosts.additionalCosts} 
                onChange={props.callBack} 
                InputProps={{
                    endAdornment: <InputAdornment position="end">EUR / j</InputAdornment>,
                }}
                inputProps={{
                    min: 0
                }}
            />
            
        </FormControl>
    )
}

export default ContractorInput;
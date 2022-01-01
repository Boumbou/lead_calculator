import { FormControl, TextField, FormGroup, RadioGroup, FormControlLabel, Radio, Switch, InputAdornment } from '@mui/material';
import React from 'react';

const SalaryInput = (props)=>{

    return(
        <FormControl fullWidth sx={{margin:'1rem'}}>
            <FormGroup row>
                <TextField
                    sx={{width:'70%'}}
                    size='small'
                    name="salary-amount" 
                    type="number"
                    label="Montant" 
                    variant='standard'
                    color="primary"
                    margin="dense"
                    value={props.data.salary.amount}
                    onChange={props.callBack}
                    InputProps={{
                        endAdornment: <InputAdornment position='end'>EUR  </InputAdornment>
                    }}
                    inputProps={{
                        min: 0
                    }}
                >
                </TextField>
                <FormControlLabel sx={{marginLeft:'0.5rem',marginTop:'1rem'}} label={props.data.salary.base === 'gross' ? 'Brut' : 'Net'}
                    control={
                        <Switch
                            // sx={{}}
                            checked={props.data.salary.base === 'gross' ? true : false}
                            
                            onChange={props.callBack}
                            name='salary-base'
                        />
                    }
                >
                </FormControlLabel>

            </FormGroup>
            <RadioGroup row label='Période de rémunération' name='period-picker' value={props.data.salary.period} onChange={props.callBack}>
                <FormControlLabel value='daily' control={<Radio/>} label='Journalier' />
                <FormControlLabel value='yearly' control={<Radio/>} label='Annuel' />
            </RadioGroup>
            <TextField 
                size='small'
                name="daily-expenses" 
                type="number"
                label="Frais-journalier" 
                color="primary"
                variant='standard'
                margin="dense"
                value={props.data.salary.dailyExpenses}
                onChange={props.callBack}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>EUR / j  </InputAdornment>
                }}
                inputProps={{
                    min: 0
                }}
            >
            </TextField>
            <TextField 
                size='small'
                name="additionnal-fees" 
                type="number"
                label="Frais-additionnels"
                color="primary"
                variant='standard'
                margin="dense"
                value={props.data.salary.additionalFees}
                onChange={props.callBack}
                InputProps={{
                    endAdornment: <InputAdornment position='end'>EUR / j  </InputAdornment>
                }}
                inputProps={{
                    min: 0
                }}
            >
            </TextField>
        </FormControl>
    )
}   

export default SalaryInput;
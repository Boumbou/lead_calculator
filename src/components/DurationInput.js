import { FormControl, FormControlLabel, FormGroup, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';


function countWorkableDays(startDate, endDate) {
    let count = 0;
    const curDate = new Date(startDate.getTime());
    while (curDate <= endDate) {
        const dayOfWeek = curDate.getDay();
        if(dayOfWeek !== 0 && dayOfWeek !== 6) count++;
        curDate.setDate(curDate.getDate() + 1);
    }
    return count;
}

const DurationInput = (props)=>{
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleChange= (e)=>{
        if(e.target.name==='start'){
            setStartDate(e.target.value);
        }else{
            setEndDate(e.target.value);
            if(startDate < e.target.value){
                let starting = new Date(startDate);
                let ending = new Date(e.target.value);
                let workingDays = countWorkableDays(starting,ending);
                props.callBack(0,workingDays);
            }
        }
    }


    return (
        <FormControl fullWidth sx={{margin:'1rem'}}>
            <FormGroup row>
                <FormControlLabel sx={{margin:'1rem'}} label='Date de début' control={<TextField name='start' value={startDate} variant='standard' type='date' onChange={handleChange} />} labelPlacement='top' />
                <FormControlLabel sx={{margin:'1rem'}} label='Date de fin' control={<TextField name='end' value={endDate} variant='standard' type='date' onChange={handleChange}  />} labelPlacement='top' />
            </FormGroup>
            
            <Typography variant='subtitle1'>ou bien saisissez le nombre de jours ouvrables</Typography>
            <TextField name='working-days' label='Durée en jours' value={props.data.duration} variant='standard' type='number' onChange={props.callBack}  />
        </FormControl>
    )
}

export default DurationInput;
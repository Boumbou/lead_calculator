import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Divider, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField, Typography } from '@mui/material';
import {processDataChanges} from '../helpers/processToResult'

const roundTwoDec = (n)=>{
    return +(Math.round( n + "e+2")  + "e-2")
}

export default function DetailsTable(props) {
    const [period, setPeriod] = useState('total');

    const handlePeriodChange = (e)=>{
        setPeriod(e.target.value);
    }

    const handleEdition = (params)=>{
        let resetData = processDataChanges(params, props.data);
        props.callBack(resetData);
    }    

    const columns = [
        { field: 'item', headerName: '', width:'200',editable: false },
        period === 'daily' && { field: 'daily', headerName: 'Journalier', type: 'number', editable: true },
        period === 'monthly' && { field: 'monthly', headerName: 'Mensuel', type: 'number', editable: true },
        period === 'yearly' && { field: 'yearly', headerName: 'Annuel', type: 'number', editable: true },
        period === 'total' && { field: 'total', headerName: 'Total', type: 'number', editable: true },
    ];

    const rows = [
      {
        id: 1,
        item:'Salaire Net',
        daily: roundTwoDec(props.data.salary.amount * (1 - (0.23))),
        monthly: roundTwoDec((props.data.salary.amount * (1 - (0.23))) * 218 / 12),
        yearly: roundTwoDec((props.data.salary.amount * (1 - (0.23))) * 218),
        total: roundTwoDec((props.data.salary.amount * (1 - (0.23))) * props.data.duration),
      },
      {
        id: 2,
        item:'Salaire Brut',
        daily: roundTwoDec(props.data.salary.amount),
        monthly: roundTwoDec(props.data.salary.amount * 218 / 12),
        yearly: roundTwoDec(props.data.salary.amount * 218),
        total: roundTwoDec(props.data.salary.amount * props.data.duration),
      },
      {
        id: 3,
        item:'Salaire chargé',
        daily: roundTwoDec(((props.data.salary.amount * 1.48) + props.data.salary.dailyExpenses + props.data.salary.additionalFees)),
        monthly: roundTwoDec(((props.data.salary.amount * 1.48) + props.data.salary.dailyExpenses + props.data.salary.additionalFees) * 218 / 12),
        yearly: roundTwoDec(((props.data.salary.amount * 1.48) + props.data.salary.dailyExpenses + props.data.salary.additionalFees) * 218),
        total: roundTwoDec(((props.data.salary.amount * 1.48) + props.data.salary.dailyExpenses + props.data.salary.additionalFees) * props.data.duration),
      },
      {
        id: 4,
        item:'Forfait journalier',
        daily: props.data.salary.dailyExpenses,
        monthly: props.data.salary.dailyExpenses * 218 / 12,
        yearly: props.data.salary.dailyExpenses * 218,
        total: props.data.salary.dailyExpenses * props.data.duration,
      },
      {
        id: 5,
        item:'Indémnités journalières',
        daily: props.data.salary.additionalFees,
        monthly: props.data.salary.additionalFees * 218 / 12,
        yearly: props.data.salary.additionalFees * 218,
        total: props.data.salary.additionalFees * props.data.duration,
      },
      {
        id: 6,
        item:'Tarif prestataire',
        daily: roundTwoDec(props.data.contractorCosts.amount),
        monthly: roundTwoDec(props.data.contractorCosts.amount * 218 / 12),
        yearly: roundTwoDec(props.data.contractorCosts.amount * 218),
        total: roundTwoDec(props.data.contractorCosts.amount * props.data.duration),
      },
      {
        id: 7,
        item:'Indémnités additionnelles',
        daily: roundTwoDec(props.data.contractorCosts.additionalCost),
        monthly: roundTwoDec(props.data.contractorCosts.additionalCost * 218 / 12),
        yearly: roundTwoDec(props.data.contractorCosts.additionalCost * 218),
        total: roundTwoDec(props.data.contractorCosts.additionalCost * props.data.duration),
      },
      {
        id: 8,
        item:'Coût total',
        daily: roundTwoDec(props.data.totalCosts / props.data.duration),
        monthly: roundTwoDec((props.data.totalCosts / props.data.duration) * 218 / 12),
        yearly: roundTwoDec((props.data.totalCosts / props.data.duration) * 218),
        total: roundTwoDec(props.data.totalCosts),
      },
      {
        id: 9,
        item:'Prix de vente',
        daily: roundTwoDec(props.data.gross.amount / props.data.duration),
        monthly: roundTwoDec((props.data.gross.amount / props.data.duration) * 218 / 12),
        yearly: roundTwoDec((props.data.gross.amount / props.data.duration) * 218),
        total: roundTwoDec(props.data.gross.amount),
      },
      {
        id: 10,
        item:'Bénéfices',
        daily: roundTwoDec(props.data.dailyProfit),
        monthly: roundTwoDec(props.data.dailyProfit * 218 / 12),
        yearly: roundTwoDec(props.data.dailyProfit * 218),
        total: roundTwoDec(props.data.totalProfit),
      }
    ];


  return (
    <div style={{ height: 300, width: '100%' }}>
        <Typography variant='h3' >{props.data.name}</Typography>
        <Divider sx={{margin:'1rem 0'}}/>
        <Typography variant='h6' sx={{margin:'1rem 0'}}>Marge appliquée</Typography>
        <TextField 
            size='small' 
            variant='standard' 
            type='number' 
            label='Taux en %' 
            name='margin' 
            value={props.data.margin}
            InputProps={{
                startAdornment: <InputAdornment position="start">%</InputAdornment>,
            }}
            inputProps={{
                min: 0
            }}
        />
        <Divider sx={{margin:'1rem 0'}}/>
        <RadioGroup row label='Période de rémunération' name='period-picker' value={period} onChange={handlePeriodChange} sx={{margin: '1rem 0'}}>
            <FormControlLabel value='daily' control={<Radio/>} label='Journalier' />
            <FormControlLabel value='monthly' control={<Radio/>} label='Mensuel' />
            <FormControlLabel value='yearly' control={<Radio/>} label='Annuel' />
            <FormControlLabel value='total' control={<Radio/>} label='Total' />
        </RadioGroup>
        
      <DataGrid autoHeight rows={rows} columns={columns} hideFooter onCellEditCommit={handleEdition} />
    </div>
  );
}



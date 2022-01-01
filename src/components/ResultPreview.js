import { FormControlLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const ResultPreview = (props)=>{
    const CostBasedPreview = ()=>{
        return(
            <Box>
                <Typography variant='subtitle1'>Durée du contrat et marge appliquée :</Typography>
                <Box sx={{margin: 'auto'}} >
                    <Typography variant='h5' component='span' sx={{margin:'0 2rem'}}>{props.data.margin+" %"}</Typography>
                    <Typography variant='h5' component='span'>{props.data.duration+" j"}</Typography>
                </Box>
                <Typography variant='subtitle1'>Coûts de la prestation :</Typography>
                <Box sx={{marginLeft: '1rem'}} >
                    <FormControlLabel label='journalier' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round((props.data.totalCosts / props.data.duration) + "e+2")  + "e-2")}</Typography>}/>
                    <FormControlLabel label='Total' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round(props.data.totalCosts + "e+2")  + "e-2")}</Typography>}/>
                </Box>
                
                <Typography variant='subtitle1'>Prix de vente estimé :</Typography>
                <Box sx={{marginLeft: '1rem'}} >
                    <FormControlLabel label='journalier' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round((props.data.gross.amount / props.data.duration) + "e+2")  + "e-2")}</Typography>}/>
                    <FormControlLabel label='Total' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round(props.data.gross.amount + "e+2")  + "e-2")}</Typography>}/>
                </Box>
                <Typography variant='subtitle1'>Bénéfices estimé :</Typography>
                <Box sx={{marginLeft: '1rem'}} >
                    <FormControlLabel label='journalier' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round(props.data.dailyProfit + "e+2")  + "e-2")}</Typography>}/>
                    <FormControlLabel label='Total' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round(props.data.totalProfit + "e+2")  + "e-2") }</Typography>}/>
                </Box>
            </Box>
            
        )
    }

    const BudgetBasedPreview = ()=>{
        return(
            <Box>
                <Typography variant='subtitle1'>Durée du contrat et marge appliquée :</Typography>
                <Box sx={{margin: 'auto'}} >
                    <Typography variant='h5' component='span' sx={{margin:'0 2rem'}}>{props.data.margin+" %"}</Typography>
                    <Typography variant='h5' component='span'>{props.data.duration+" j"}</Typography>
                </Box>
                <Typography variant='subtitle1'>Prix de vente fixé :</Typography>
                <Box sx={{marginLeft: '1rem'}} >
                    <FormControlLabel label='journalier' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round((props.data.gross.amount / props.data.duration) + "e+2")  + "e-2")}</Typography>}/>
                    <FormControlLabel label='Total' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round(props.data.gross.amount + "e+2")  + "e-2")}</Typography>}/>
                </Box>
                <Typography variant='subtitle1'>Coûts maximum de la prestation :</Typography>
                <Box sx={{marginLeft: '1rem'}} >
                    <FormControlLabel label='journalier' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round((props.data.totalCosts / props.data.duration) + "e+2")  + "e-2")}</Typography>}/>
                    <FormControlLabel label='Total' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round(props.data.totalCosts + "e+2")  + "e-2")}</Typography>}/>
                </Box>
                <Typography variant='subtitle1'>Bénéfices estimé :</Typography>
                <Box sx={{marginLeft: '1rem'}} >
                    <FormControlLabel label='journalier' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round(props.data.dailyProfit + "e+2")  + "e-2")}</Typography>}/>
                    <FormControlLabel label='Total' labelPlacement='bottom' control={<Typography variant='h5'>{+(Math.round(props.data.totalProfit + "e+2")  + "e-2") }</Typography>}/>
                </Box>
            </Box>
        )
    }

    if(props.scenarioBase === 'SalaryBased' || props.scenarioBase === 'ServiceBased'){
        return <CostBasedPreview/>
    }else if(props.scenarioBase === 'BudgetBased'){
        return <BudgetBasedPreview/>
    }
    
    
}

export default ResultPreview;
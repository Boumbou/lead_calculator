import { Button, FormControl, FormGroup, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react';
import BusinessCaseCard from "./BusinessCaseCard";
import { useSelector } from 'react-redux';
import {selectBCList} from '../businessCases/businessCaseSlice';
import {nanoid} from 'nanoid';
import {useNavigate} from 'react-router-dom';
import { useLocation } from 'react-router';
import CustomSnackBar from './CustomSnackBar';


const ListView = ()=>{
    const [newBusinessName, setNewBusinessName] = useState('');
    const [scenarioBase, setScenarioBase] = useState('');
    let navigate = useNavigate();
    const businessList = useSelector(selectBCList);
    const {state} = useLocation();

    const handleChange = (e)=>{
        setNewBusinessName(e.target.value);
    }

    const handleScenarioChange = (e)=>{
        setScenarioBase(e.target.value);
    }

    const handleClick = ()=>{
        navigate('/new', {state:{name:newBusinessName, scenarioBase: scenarioBase}});
    }

    const BusinessCardsList = ()=>{
       
        return (businessList.map((index, item)=>{
            let key = nanoid();
            return(
                <BusinessCaseCard key={key}/>
            )
        })
        )
        
    }

    return(
        <div>
            <Typography variant="h3" sx={{margin:'1rem'}}>Liste de simulations</Typography>
            <FormControl fullWidth sx={{ margin:'2rem 0'}}>
                <FormGroup sx={{width:'100%'}}>
                    <TextField 
                        variant='standard' 
                        type='text' 
                        name='newBusiness' 
                        value={newBusinessName} 
                        id='new-business-case' 
                        label='créer une nouvelle simulation' 
                        sx={{margin:'1rem'}}
                        onChange={handleChange}
                    />
                    <ToggleButtonGroup sx={{margin:'auto', visibility: newBusinessName === '' && 'hidden'}} color='primary' value={scenarioBase} exclusive onChange={handleScenarioChange}>
                        <ToggleButton value='SalaryBased'>Salaire</ToggleButton>
                        <ToggleButton value='ServiceBased'>Coût prestataire</ToggleButton>
                        <ToggleButton value='BudgetBased'>Prix de vente</ToggleButton>
                    </ToggleButtonGroup>
                    <Button disabled={newBusinessName === '' || scenarioBase === ''} variant='contained' color='primary' sx={{margin:'1rem'}} onClick={handleClick}>Créer</Button>
                </FormGroup>
                
            </FormControl>
            {businessList ? <BusinessCardsList/> : <Typography variant='subtitle1'>Aucune simulation enregistrée...</Typography>}
            {state && <CustomSnackBar severity='success' message='Nouvelle affaire ajoutée' />}
        </div>
    )
}

export default ListView;
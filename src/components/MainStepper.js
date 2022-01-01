import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import StepForm from './StepForm';
import { useLocation } from 'react-router';
import ResultPreview from './ResultPreview';
import {processToResult} from '../helpers/processToResult'
import { useDispatch } from 'react-redux';
import { addOne } from '../businessCases/businessCaseSlice';
import {useNavigate} from 'react-router-dom';

const steps = {
  Salarybased:[
    {
      label: 'Durée du contrat',
      description:
        'Sélectionnez une date de début et une date de fin',
    },
    {
      label: 'Salaire',
      description: `Saisissez un salaire dans l'un des champs`,
    },
    {
      label: 'Marge',
      description: 'Choisir le taux de marge cible',
    },
  ],
  ServiceBased:[
    {
      label: 'Durée du contrat',
      description:
        'Sélectionnez une date de début et une date de fin',
    },
    {
      label: 'Coût de prestation',
      description: `Saisissez le coût du prestataire`,
    },
    {
      label: 'Marge',
      description: 'Choisir le taux de marge cible',
    },
  ],
  BudgetBased:[
    {
      label: 'Durée du contrat',
      description:
        'Sélectionnez une date de début et une date de fin',
    },
    {
      label: 'Budget client',
      description: `Saisissez le budget du client dans l'un des champs`,
    },
    {
      label: 'Marge',
      description: 'Choisir le taux de marge cible',
    },
  ],

};

export default function MainStepper() {
  //get back new business case name from redirect
  const {state} = useLocation();
  const {name, scenarioBase} = state;
  //initiate activeStep state
  const [activeStep, setActiveStep] = useState(0);
  //initiate new business case details
  const [businessData, setBusinessData] = useState({
    name: name,
    duration: 218,
    salary:{
      base: 'gross',
      amount:0,
      period: 'daily',
      dailyExpenses: 0,
      additionalFees:0
    },
    contractorCosts:{
      amount:0,
      additionalCost:0,
    },
    totalCosts:0,
    margin:25,
    gross:{
      amount:0,
      period:'daily'
    },
    totalProfit:0,
    dailyProfit:0
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //define steps
  let selectedSteps =[];
  if(scenarioBase === 'SalaryBased'){
    selectedSteps = steps.Salarybased;
  }else if(scenarioBase === 'ServiceBased'){
    selectedSteps = steps.ServiceBased;
  }else if(scenarioBase === 'BudgetBased'){
    selectedSteps = steps.BudgetBased;
  }

  useEffect(()=>{
    setBusinessData(
      {
        name: name,
        duration: 218,
        salary:{
          base: 'gross',
          amount:0,
          period: 'daily',
          dailyExpenses: 0,
          additionalFees:0
        },
        contractorCosts:{
          amount:0,
          additionalCost:0,
        },
        totalCosts:0,
        margin:25,
        gross:{
          amount:0,
          period:'daily'
        },
        totalProfit:0,
        dailyProfit:0
      }
    )
    },
    []
  )

  const handleSalaryChange = (e) =>{
    switch(e.target.name){
        case 'period-picker':
            setBusinessData({ 
                ...businessData,
                salary:{...businessData.salary,period: e.target.value}
            })
            break;
        case 'salary-amount':
            setBusinessData({ 
                ...businessData,
                salary:{...businessData.salary, amount: Number(e.target.value)}
            })
            break;
        case 'daily-expenses':
            setBusinessData({ 
                ...businessData,
                salary:{...businessData.salary,dailyExpenses: Number(e.target.value)}
            })
            break;
        case 'additionnal-fees':
            setBusinessData({ 
                ...businessData,
                salary:{...businessData.salary,additionalFees: Number(e.target.value)}
            })
            break;
        case 'salary-base':
          let base= '';
          if(businessData.salary.base === 'gross'){
            base='net';
          }else{
            base = 'gross';
          }
            setBusinessData({ 
                ...businessData,
                salary:{...businessData.salary,base: base}
            })
            break;
    }
  }

  const handleDurationChange = (e,workingDays) =>{
    if(e === 0){
      setBusinessData({
        ...businessData,duration: workingDays
      })
    }else{
      setBusinessData({
        ...businessData,duration: Number(e.target.value)
      })
    }
    
  }

  const handleMarginChange = (e) =>{
    setBusinessData({
      ...businessData,margin: Number(e.target.value)
    })
  }

  const handleContractorChange = (e) =>{
    if(e.target.name === 'daily-cost'){
      setBusinessData({
        ...businessData,
        contractorCosts:{...businessData.contractorCosts, amount: Number(e.target.value)}
      })
    }else{
      setBusinessData({
        ...businessData,
          contractorCosts:{...businessData.contractorCosts, additionalCost: Number(e.target.value)}
      })
    }
  }

  const handleGrossChange = (e) =>{
    if(e.target.name === 'gross-amount'){
      setBusinessData({
        ...businessData,
        gross:{...businessData.gross, amount: Number(e.target.value)}
      })
    }else{
      setBusinessData({
        ...businessData,
          gross:{...businessData.gross, period: e.target.value}
      })
    }
  }

  const handlers = {
    salaryCallback: handleSalaryChange,
    durationCallBack: handleDurationChange,
    marginCallBack: handleMarginChange,
    contractorCallBack: handleContractorChange,
    grossCallBack: handleGrossChange
  }

  // const processData = ()=>{
  //   if(scenarioBase === 'SalaryBased'){
  //     let salary = businessData.salary;
  //     let gross = businessData.gross;
  //     let duration = businessData.duration;
  //     let margin = businessData.margin;

  //     if(salary.amount > 0 && margin > 0 && duration > 0){
  //       //define salary gross
  //       let salaryGross = salary.amount
  //       if(salary.base === 'net'){
  //         salaryGross = salaryGross * 1.23;
  //       }
  //       let dailySalary = salaryGross;
  //       if(salary.period === 'yearly'){
  //         dailySalary = salaryGross / 218;
  //       }
  //       // define total results
  //       let wageCost = ((dailySalary * duration) * 1.48) + ((salary.dailyExpenses + salary.additionalFees) * duration)
  //       let totalGross = wageCost * (1+(margin/100));
  //       let totalProfit = totalGross - wageCost;
  //       let dailyProfit = totalProfit / duration;

  //       setBusinessData({
  //         ...businessData,
  //         totalCosts: wageCost,
  //         totalProfit: totalProfit,
  //         dailyProfit: dailyProfit,
  //         salary:{...businessData.salary, 
  //           amount: dailySalary,
  //           base: 'gross',
  //           period: 'daily'
  //         },
  //         gross:{...businessData.gross,
  //           amount:totalGross,
  //           period: 'total'
  //         }
  //       })

  //       return 0;
  //     }

  //   }
  // }

  const handleNext = (e) => {
    if(e.target.value === 'Suivant'){
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }else{
      let result = processToResult(scenarioBase,businessData);
      if(result !== -1){
        setBusinessData(result);
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } 
    }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setBusinessData(
      {
        name: name,
        duration: 218,
        salary:{
          base: 'gross',
          amount: 0,
          period: 'daily',
          dailyExpenses: 0,
          additionalFees:0
        },
        contractorCosts:{
          amount:0,
          additionalCost:0,
        },
        margin:25,
        gross:{
          amount:0,
          period:'daily'
        },
        totalProfit:0,
        dailyProfit:0
      }
    )
    setActiveStep(0);
  };

  const handleSaveClick = ()=>{
    dispatch(addOne(businessData));
    navigate('/', {state:{newEntryName:businessData.name}});
  }

  const handleSeeDetailClick = ()=>{
    navigate('/details/'+businessData.name, {state:{data:businessData}});
  }

  return (
    <Box sx={{ maxWidth: 500 }} style={{margin: 'auto'}}>
      <Typography variant="h5" sx={{margin:'1.5rem'}}>{name}</Typography>
      <Stepper activeStep={activeStep} orientation="vertical">
        {selectedSteps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 2 ? (
                  <Typography variant="caption">Dernière étape</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography sx={{marginLeft:'1rem'}}>{step.description}</Typography>
              <StepForm stepLabel={step.label} data={businessData} callBack={handlers}/>
              <Box sx={{ mb: 2 , marginLeft:'1rem'}}>
                <div>
                  <Button
                    variant="contained"
                    value={index === selectedSteps.length - 1 ? 'Terminer' : 'Suivant'}
                    onClick={handleNext}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    {index === selectedSteps.length - 1 ? 'Terminer' : 'Suivant'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Retour
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === selectedSteps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Résultat :</Typography>
          <ResultPreview data={businessData} scenarioBase={scenarioBase} />
          <Button  variant='contained' sx={{ mt: 1, mr: 1 }} onClick={handleSaveClick} >
            Sauvegarder
          </Button>
          <Button variant='outlined' sx={{ mt: 1, mr: 1 }} onClick={handleSeeDetailClick} >
            Voir les détails
          </Button>
          <Button onClick={handleReset} color='error' sx={{ mt: 1, mr: 1 }}>
            Recommencer
          </Button>
        </Paper>
      )}
    </Box>
  );
}

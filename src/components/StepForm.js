
import React from 'react'
import SalaryInput from './SalaryInput';
import DurationInput from './DurationInput';
import MarginInput from './MarginInput';
import ContractorInput from './ContractorInput';
import GrossInput from './GrossInput';

const StepForm = (props)=>{

    if (props.stepLabel === 'Salaire') {
        return <SalaryInput data={props.data} callBack={props.callBack.salaryCallback}/>
    }else if(props.stepLabel === 'Durée du contrat'){
        return <DurationInput data={props.data} callBack={props.callBack.durationCallBack}/>
    }else if(props.stepLabel === 'Marge'){
        return <MarginInput data={props.data} callBack={props.callBack.marginCallBack}/>
    }else if(props.stepLabel === 'Coût de prestation'){
        return <ContractorInput data={props.data} callBack={props.callBack.contractorCallBack}/>
    }else if(props.stepLabel === 'Budget client'){
        return <GrossInput data={props.data} callBack={props.callBack.grossCallBack}/>
    }
}

export default StepForm;
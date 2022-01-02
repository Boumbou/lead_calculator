import React, { useState } from 'react';
import { useLocation } from 'react-router';
import DetailsTable from './DetailsTable';

const DetailView = (props)=>{
    const {state} = useLocation();
    const {data} = state;
    const [localData,setLocalData] = useState(data)

    const handleChanges= (changes)=>{
        setLocalData(changes);
    }

    return(
        <div>
            <DetailsTable data={localData} callBack={handleChanges} />
        </div>
    )
}

export default DetailView;
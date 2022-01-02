
const processToResult = (scenarioBase, data)=>{
    let duration = data.duration;
    let margin = data.margin;
    let resultData = {};
    let netToBrutRate = (100-77)/77;
    let fullChargedToBrut = (100-148)/148;
    let grossToCost = (100 - 125) / 125;

    if(scenarioBase === 'SalaryBased'){
      if(data.salary.amount > 0 && margin > 0 && duration > 0){
        let salary = data.salary;
        //define salary gross
        let salaryGross = salary.amount
        if(salary.base === 'net'){
          salaryGross = salaryGross * (1 + netToBrutRate);
        }
        let dailySalary = salaryGross;
        if(salary.period === 'yearly'){
          dailySalary = salaryGross / 218;
        }
        // define total results
        let wageCost = ((dailySalary * duration) * 1.48) + ((salary.dailyExpenses + salary.additionalFees) * duration)
        let totalGross = wageCost * (1+(margin/100));
        let totalProfit = totalGross - wageCost;
        let dailyProfit = totalProfit / duration;

        resultData = {
          ...data,
          totalCosts: wageCost,
          totalProfit: totalProfit,
          dailyProfit: dailyProfit,
          salary:{...data.salary, 
            amount: dailySalary,
            base: 'gross',
            period: 'daily'
          },
          contractorCosts:{
            amount:wageCost / duration,
            additionalCost:0,
          },
          gross:{...data.gross,
            amount:totalGross,
            period: 'total'
          }
        }
      }
    }else if(scenarioBase === 'ServiceBased'){
        if ( data.contractorCosts.amount > 0 && margin > 0 && duration > 0){
            let contractorFullRate = data.contractorCosts.amount + data.contractorCosts.additionalCost;
            let fullCost = contractorFullRate * duration;
            let totalGross = fullCost * (1+(margin/100));
            let totalProfit = totalGross - fullCost;
            let dailyProfit = totalProfit / duration;
    
            resultData = {
                ...data,
                totalCosts: fullCost,
                salary:{...data.salary, 
                  amount: contractorFullRate * (1+fullChargedToBrut),
                  base: 'gross',
                  period: 'daily'
                },
                totalProfit: totalProfit,
                dailyProfit: dailyProfit,
                gross:{...data.gross,
                  amount:totalGross,
                  period: 'total'
                }
            }
        }
    }else if(scenarioBase === 'BudgetBased'){
        if(data.gross.amount > 0 && margin > 0 && duration > 0){
            let dailyGross = data.gross.amount;
            if(data.gross.period === 'total'){
                dailyGross = dailyGross / duration;
            }
            let maxDailyCost = dailyGross * (1+grossToCost);
            let maxDailySalary = maxDailyCost * (1+fullChargedToBrut);
            let totalProfit = dailyGross * duration - maxDailyCost * duration;
            let dailyProfit = totalProfit / duration;

            resultData = {
                ...data,
                salary:{
                    base: 'gross',
                    amount:maxDailySalary,
                    period: 'daily',
                    dailyExpenses: 0,
                    additionalFees:0
                },
                contractorCosts:{
                    amount:maxDailyCost,
                    additionalCost:0,
                },
                totalCosts:maxDailyCost * duration,
                margin:25,
                gross:{
                    amount:dailyGross * duration,
                    period:'total'
                },
                totalProfit:totalProfit,
                dailyProfit:dailyProfit
            }
        }
    }
    if(resultData.totalProfit){
        return resultData;
    }
    console.log(resultData);
    return -1;
  }

const processDataChanges = (params, changes)=>{
  let result = {};
  let netToBrutRate = (100-77)/77;
  let fullChargedToBrut = (100-148)/148;

  switch (params.id) {
    case 1: //salaire net
      if(params.field === 'daily'){
        let newSalary = params.value * (1+netToBrutRate);
        // let wageCost = ((newSalary * changes.duration) * 1.48) + ((changes.salary.dailyExpenses + changes.salary.additionalFees) * changes.duration)
        // let totalGross = wageCost * (1+(margin/100));
        // let margin = (changes.gross.amount - wageCost) / wageCost
        // let totalProfit = totalGross - wageCost;
        // let dailyProfit = totalProfit / duration;

        result = {
          ...changes,
          salary:{
            ...changes.salary,
            amount: newSalary
          },
          contractorCosts:{
            ...changes.contractorCosts,
            amount: changes.amount + (newSalary - (changes.amount + changes.additionalCost))
          }
        }

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 2: //salaire brut
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 3: //salaire chargé
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 4: //Forfait journalier
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 5: //Indémnités journalières
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 6: //Tarif prestataire
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 7: //Indémnités additionnelles
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 8: //Coût total
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 9: //Prix de vente
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    case 10: //Bénéfices
      if(params.field === 'daily'){

      }else if(params.field === 'monthly'){

      }else if(params.field === 'yearly'){

      }else if(params.field === 'total'){

      }
      break;
    default:
      break;
  }

  return result;
}

  export {processToResult, processDataChanges};
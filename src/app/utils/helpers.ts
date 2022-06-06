import  PDE  from 'src/assets/PDE.json';


export function getsortedPDEList(){
return PDE.sort(function(a, b) {
    const nameA = a?.PDE.toUpperCase(); // ignore upper and lowercase
    const nameB = b?.PDE.toUpperCase(); // ignore upper and lowercase
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
  
    // names must be equal
    return 0;
  })
}

export function getPDEByValue(){
  return PDE.sort(function(a, b) {
      const nameA = a?.PDE.toUpperCase(); // ignore upper and lowercase
      const nameB = b?.PDE.toUpperCase(); // ignore upper and lowercase
      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
    
      // names must be equal
      return 0;
    })
  }


export function getFinancialYears(){
    return [
      "2021-2022",
      "2020-2021",
      "2019-2020",
      "2018-2019",
      "2017-2018",
    ]
}


export function addArrayValues(data) {
  const initialValue = 0;
  const sumWithInitial = data.reduce(
    (previousValue, currentValue) => previousValue + currentValue,
    initialValue
  );

  return sumWithInitial
}

export function NumberSuffix(input,args)  {
  
    let exp;
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
    const isNagtiveValues = input < 0;
    if (Number.isNaN(input) || (input < 1000 && input >= 0) || !isNumeric(input) || (input < 0 && input > -1000)) {
      if (!!args && isNumeric(input) && !(input < 0) && input != 0) {
        return input.toFixed(args);
      } else {
        return input;
      }
    }

    if (!isNagtiveValues) {
      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
    } else {
      input = input * -1;

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return (input * -1 / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
    }
  }
    
  
  export function isNumeric(value): boolean {
    if (value < 0) value = value * -1;
    if (/^-{0,1}\d+$/.test(value)) {
      return true;
    } else if (/^\d+\.\d+$/.test(value)) {
      return true;
    } else {
      return false;
    }
  }



  export function sanitizeCurrencyToString(data){
    var valueC = data.split(',')
    var valueD = parseInt(valueC.join(''))
    return valueD
  }

  export async function slowLoader(){
    await new Promise(resolve => setTimeout(resolve, 2000));    
  }


export function capitalizeFirstLetter(string) {
  if(string !== null){
     return string[0].toUpperCase() + string.slice(1);
  }else{
    return "Unknown"
  }
 
}



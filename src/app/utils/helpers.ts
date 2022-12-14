import  PDE  from 'src/assets/PDE.json';
import * as _ from 'lodash';

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

// export function NumberSuffix(input,args)  {

//     let exp;
//     const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
//     const isNagtiveValues = input < 0;
//     if (Number.isNaN(input) || (input < 1000 && input >= 0) || !isNumeric(input) || (input < 0 && input > -1000)) {
//       if (!!args && isNumeric(input) && !(input < 0) && input != 0) {
//         return input.toFixed(args);
//       } else {
//         return input;
//       }
//     }

//     if (!isNagtiveValues) {
//       exp = Math.floor(Math.log(input) / Math.log(1000));

//       return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
//     } else {
//       input = input * -1;

//       exp = Math.floor(Math.log(input) / Math.log(1000));

//       return (input * -1 / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
//     }
//   }


  export function NumberSuffix(input, args)  {

    let exp;
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
    const isNagtiveValues = input < 0;

    if (Number.isNaN(input) || (input < 1000 && input >= 0) || !isNumeric(input) || (input < 0 && input > -1000)) {
      if (!!args && isNumeric(input) && !(input < 0) && input != 0) {
        return checkIfNumberAfterDecimalPointIsZero(input.toFixed(args),args);
      } else {
        return input;
      }
    }

    if (!isNagtiveValues) {
      if (input > 1000000000000) {
        exp = Math.floor(Math.log(input) / Math.log(1000000000000));

        return checkIfNumberAfterDecimalPointIsZero(

          (input / Math.pow(1000000000000, exp)).toFixed(args)

          ,args
          ) + "T";
      }
      else if (input < 1000000000000) {
      exp = Math.floor(Math.log(input) / Math.log(1000));

      return checkIfNumberAfterDecimalPointIsZero(
        ((input / Math.pow(1000, exp)).toFixed(args)),args
        ) + suffixes[exp - 1];
    }
    } else {
      input = input * -1;

      exp = Math.floor(Math.log(input) / Math.log(1000));

      return `${(input * -1 / Math.pow(1000, exp)).toFixed(args)}${suffixes[exp - 1]}`;
    }
  }

  export function convertNegativeToPositive(arrayObject){
    return arrayObject.map(element=> element * (-1) )
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
    let valueC = data.split(',')
    let valueD = parseInt(valueC.join(''))
    return valueD
  }

  export async function slowLoader(){
    await new Promise(resolve => setTimeout(resolve, 1000));
  }


export function capitalizeFirstLetter(stringToCheck) {  
  if(stringToCheck !== null && stringToCheck !== ''){
     return stringToCheck[0].toUpperCase() + stringToCheck.slice(1);
  }else{
    return "Unknown"
  }
}

export function convertNumbersWithCommas(number: number) {
  let splitNumber = number.toString().split('.')
  let numberWithCommas = splitNumber[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  let fullNumberWithCommas = numberWithCommas +  (splitNumber[1]?('.' +splitNumber[1]):'');
  return fullNumberWithCommas;
}

export function convertNumberSuffixWithCommas(numberWithSuffix) {

  let splitNumber = numberWithSuffix.split('.')
  let numberWithCommas = splitNumber[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  let fullNumberWithSuffixAndCommas = numberWithCommas +  (splitNumber[1]?('.' +splitNumber[1]):'')
  return fullNumberWithSuffixAndCommas;
}




export function sortTable(n,tableName) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById(tableName);
  switching = true;
  // Set the sorting direction to ascending:
  dir = "asc";
  this.dir="asc"
  /* Make a loop that will continue until
  no switching has been done: */
  while (switching) {
    // Start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /* Loop through all table rows (except the
    first, which contains table headers): */
    for (i = 1; i < (rows.length - 1); i++) {
      // Start by saying there should be no switching:
      shouldSwitch = false;
      /* Get the two elements you want to compare,
      one from current row and one from the next: */
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /* Check if the two rows should switch place,
      based on the direction, asc or desc: */

      // console.log(x)
      // console.log(y)

      if (dir == "asc") {
        if (sanitizeCurrencyToString(x.innerHTML) > sanitizeCurrencyToString(y.innerHTML)) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (sanitizeCurrencyToString(x.innerHTML) < sanitizeCurrencyToString(y.innerHTML) ) {
          // If so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /* If a switch has been marked, make the switch
      and mark that a switch has been done: */
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      // Each time a switch is done, increase this count by 1:
      switchcount ++;
    } else {
      /* If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again. */
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        this.dir="desc"
        switching = true;
      }
    }
  }
}


export function getDays(dateOne , dateTwo){
  var date1 = new Date(dateOne);
  var date2 = dateTwo? new Date(dateTwo) : new Date(Date.now());


  var a =  (date1.getUTCMonth()+1) + '/' + date1.getUTCDate() +  '/' + date1.getUTCFullYear()
  var b =  (date2.getUTCMonth()+1) + '/' + date2.getUTCDate() + '/' + date2.getUTCFullYear()
  
  // console.log(` date1 ${dateOne}    date1   ${new Date(dateOne)} a dd/mm/yyyy ${a}   a ${new Date(a)}`)
  // console.log(` date2 ${dateTwo}    date2   ${new Date(dateTwo)} b dd/mm/yyyy ${b}   b ${new Date(b)}`)
  
// To calculate the time difference of two dates
var Difference_In_Time = new Date(a).getTime() - new Date(b).getTime();

// To calculate the no. of days between two dates
var Difference_In_Days = Math.ceil(Difference_In_Time / (1000 * 3600 * 24));

return Difference_In_Days
}




function checkIfNumberAfterDecimalPointIsZero(numberToBeChanged , decimalPoints){
  if(decimalPoints > 0 && decimalPoints < 3){
    var splitNumber = numberToBeChanged.split('.')
    var numbersAfterDecimal = splitNumber[1]

    if(parseInt(numbersAfterDecimal) == 0){
      return splitNumber[0]
    }else {
      return numberToBeChanged
    }
  }else{
    return numberToBeChanged
  }
}


export function visualisationMessages(type){
  let message 
  let checkIfSuperAdmin = localStorage.getItem('isSuperAdmin');

  let roles = checkIfSuperAdmin == 'true' ? 'super-admin' : 'pde-admin'

  let checkIfPdeOrDept = (roles == 'super-admin') ? 'PDE' : 'Department'

  let deptOrPde = checkIfPdeOrDept

  switch(type){
    case  'empty':
      message = `No Data Available For Selected Financial Year or ${deptOrPde}`
      break
    case  'error':
        message = 'Error Loading Data , Refresh or Try changing the search filter '
        break
    case  'loading':
      message = 'Loading Data , Please Wait'
        break
  }

  return message
}

export function emptyVisualisation(type) {
  return {
    series: [],
    xaxis: {
      categories:[],
    },
    // chart: {
    //   type: "donut",
    // },
    noData:{
      text:visualisationMessages(type)
    }      
  }
}

export function emptyVisualisationNonAxis(type) {
  return {
    series: [],
    labels: [],
    // chart: {
    //   type: "donut",
    // },
    noData:{
      text:visualisationMessages(type)
    }      
  }
}

export function groupBy(objectArray, property) {
  return objectArray.reduce(function (acc, obj) {
    let key = obj[property]
    if (!acc[key]) {
      acc[key] = []
    }
    acc[key].push(obj)
    return acc
  }, {})
}

export function removeDuplicates(objectArray,primaryKey){
  return _.uniqBy(objectArray,primaryKey)
}

// export function getLargestValueInArrays(array1,array2){
//   _.
// }


export function sortArrayBy(objectArray, property){
  return objectArray.sort(function (a, b) {
    var nameA = a[property].split(',')
    var nameB = b[property].split(',')
    var valueA = parseInt(nameA.join(''))
    var valueB = parseInt(nameB.join(''))

    if (valueA > valueB) {
      return -1;
    }
    if (valueA < valueB) {
      return 1;
    }
    return 0;
  }
  )
}

export function sortArrayByNumber(objectArray, property){
  return objectArray.sort(function (a, b) {
    var valueA = a[property]
    var valueB = b[property]  

    if (valueA > valueB) {
      return -1;
    }
    if (valueA < valueB) {
      return 1;
    }
    return 0;
  }
  )
}

export function getObjectTotal(objectGroup){

  let arrayToReceive = []
  for (const prop in objectGroup) {
    let reservePrice = []
    objectGroup[prop].forEach(element => {
      reservePrice.push(parseInt(
        element?.reservePrice ? element?.reservePrice.split(',').join('') : 0))
    });
    let objectProcurementMethod = {
      procurementMethod : prop,
      numberOfDisposals : objectGroup[prop].length,
      totalReservePrice : addArrayValues(reservePrice)
    }
    arrayToReceive.push(objectProcurementMethod)
  }

  return arrayToReceive

}



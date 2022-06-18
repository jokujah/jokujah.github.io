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


  export function NumberSuffix(input,args)  {

    let exp;
    const suffixes = ['K', 'M', 'B', 'T', 'P', 'E'];
    const isNagtiveValues = input < 0;

    // console.log(`Number.isNaN(input)`,Number.isNaN(input))
    // console.log(`(input < 1000 && input >= 0)`,(input < 1000 && input >= 0))
    // console.log(`!isNumeric(input)`,!isNumeric(input))
    // console.log(`(input < 0 && input > -1000)`,(input < 0 && input > -1000))
    // console.log(`(input < 1000)`,(input < 1000))
    

    if (Number.isNaN(input) || (input < 1000 && input >= 0) || !isNumeric(input) || (input < 0 && input > -1000)) {
      if (!!args && isNumeric(input) && !(input < 0) && input != 0) {
        if ((input < 1000)) {
          return input;
        } else {
          return input.toFixed(args);
        }
      } else {
        return input;
      }
    }

    if (!isNagtiveValues) {
      if (input > 1000000000000) {
        exp = Math.floor(Math.log(input) / Math.log(1000000000000));

        let value = input / Math.pow(1000000000000, exp)
        
        if(Number.isInteger(value)){          
          return convertNumbersWithCommas(value) + "T";
        }else{
          let splitValue = value.toFixed(args).split('.')

          return convertNumbersWithCommas(parseFloat(splitValue[0]))+"."+splitValue[1] + "T";

          //return parseFloat(convertNumbersWithCommas(value)).toFixed(args) + "T";
        } 

      }
      else if (input < 1000000000000) {
        exp = Math.floor(Math.log(input) / Math.log(1000));

        let value = input / Math.pow(1000, exp)
        
       
        if(Number.isInteger(value)){
          return convertNumbersWithCommas(value) + suffixes[exp - 1];
        }else{
          let splitValue = value.toFixed(args).split('.')

          return convertNumbersWithCommas(parseFloat(splitValue[0]))+"."+splitValue[1] + "T";

         // return parseFloat(convertNumbersWithCommas(value)).toFixed(args) + suffixes[exp - 1];
        }        
      }
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
    await new Promise(resolve => setTimeout(resolve, 1000));
  }


export function capitalizeFirstLetter(string) {
  if(string !== null){
     return string[0].toUpperCase() + string.slice(1);
  }else{
    return "Unknown"
  }

}

export function convertNumbersWithCommas(number: number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
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



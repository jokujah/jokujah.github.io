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


export function getFinancialYears(){
    return [ 
        "2022-2021",
        "2021-2020",
        "2020-2019",
        "2019-2018",
        "2018-2017",
    ]
}
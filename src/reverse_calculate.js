function calculate(kilos, pounds) {
  var totalKilos = kilos.reduce((sum, x)=>sum+x) + pounds.map((x)=>x/2.205).reduce((sum, x)=>sum+x);
  return [totalKilos, totalKilos*2.205];
}
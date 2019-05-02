// // denominations
// var d = [0.5, 1, 1.5, 2, 2.5, 5, 10, 15, 20, 25, 50];
// // multiply by 10 to have whole numbers
// d = d.map((v)=>v*10);
// // value
// var v = 20.5*10;

// console.log(change(d,v).map((v)=>v/10));

export function findPoundPlates (denoms, value, bar) {
  // Remove decimals by multiplying by 10
  denoms = denoms.map((x) => x * 10)
  value = (value - bar) * 10 / 2.0
  // c[p] = minimum # of coins for p cents
  var c = []
  // s[p] = last coin used to make p cents
  var s = []

  for (var p = 0; p <= value; p++) {
    if (p === 0) {
      c[p] = 0
      s[p] = 0
    } else {
      // min(c[p-d_i]+1) where d1<=d_i<=p
      var minC = Number.MAX_SAFE_INTEGER
      var minS = -1
      for (var i = 0; (i <= denoms.length) && (denoms[i] <= p); i++) {
        var currentC = c[p - denoms[i]] + 1
        if (currentC < minC) {
          minC = currentC
          minS = denoms[i]
        }
      }
      c[p] = minC
      s[p] = minS
    }
  }
  // console.log(c)
  // console.log(s)
  // List of changes
  var changes = []
  while (value > 0) {
    changes.push(s[value] / 10)
    value = value - s[value]
  }
  changes.sort((a, b) => b - a)
  return changes
}

// // denominations
// var d = [0.5, 1, 1.5, 2, 2.5, 5, 10, 15, 20, 25, 50];
// // multiply by 10 to have whole numbers
// d = d.map((v)=>v*10);
// // value
// var v = 20.5*10;

// console.log(change(d,v).map((v)=>v/10));

export function kiloPlates(denoms, value) {
  // c[p] = minimum # of coins for p cents
  var c = [];
  // s[p] = last coin used to make p cents
  var s = [];

  for (var p=0; p<=value; p++) {
    if (p==0) {
      c[p]=0;
      s[p]=0;
    } else {
      // min(c[p-d_i]+1) where d1<=d_i<=p
      var min_c = Number.MAX_SAFE_INTEGER;
      var min_s = -1;
      for (var i=0; (i<=denoms.length) && (denoms[i] <= p); i++) {
        var current_c = c[p-denoms[i]] + 1;
        if (current_c < min_c) {
          min_c = current_c;
          min_s = denoms[i];
        }
      }
      c[p]=min_c;
      s[p]=min_s;
    }
  }
  // List of changes
  var changes = [];
  while (value > 0) {
    changes.push(s[value]);
    value = value - s[value];
  }
  return changes;
}
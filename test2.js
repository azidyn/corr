
let a = [1,2,3,4,5]
let b = [5,4,3,3,4];


// +console.log(c)



//   dt = Date.now();
//   for ( let i=0; i<1000000; i++ )
      c = pcorr( a, b );
  
      console.log( c )
//   console.log( c, Date.now() - dt )
  
//   let R = pcorr(a, b);
//   console.log( R )
//   console.log('arrX', arrX, 'arrY', arrY, 'R', R);




function corr(a,b) {

    // Stolen from here, but fudged the bizarre parameter convention:
    // https://gist.github.com/matt-west/6500993

    const p1 = 0, p2 = 1;
    const prefs = [ a, b ];

    ////////////////////////////////////////

    let si = [];
  
    for ( let key in prefs[p1] ) 
      if ( prefs[p2][key] ) si.push( key );
  
    let n = si.length;
  
    if ( n == 0 ) 
        return 0;
  
    let sum1 = 0;
    for ( let i = 0; i < si.length; i++ ) 
        sum1 += prefs[p1][si[i]];
  
    let sum2 = 0;
    for ( let i = 0; i < si.length; i++ ) 
        sum2 += prefs[p2][si[i]];
  
    let sum1Sq = 0;
    for ( let i = 0; i < si.length; i++ )
      sum1Sq += Math.pow(prefs[p1][si[i]], 2);
  
    let sum2Sq = 0;
    for ( let i = 0; i < si.length; i++ )
      sum2Sq += Math.pow( prefs[p2][si[i]], 2 );
  
    let pSum = 0;
    for ( let i = 0; i < si.length; i++ )
      pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
  
    let num = pSum - (sum1 * sum2 / n);
    let den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
        (sum2Sq - Math.pow(sum2, 2) / n));
  
    if (den == 0) return 0;
  
    return num / den;
  }


  
function corr2(a,b) {

    // Stolen from here, but fudged the bizarre parameter convention:
    // https://gist.github.com/matt-west/6500993

    const p1 = 0, p2 = 1;
    const prefs = [ a, b ];

    ////////////////////////////////////////

    let si = [];
  
    for ( let key in prefs[p1] ) 
      if ( prefs[p2][key] ) si.push( key );
  
    let n = si.length;
  
    if ( n == 0 ) 
        return 0;
  
    let sum1 = 0;
    for ( let i = 0; i < si.length; i++ ) 
        sum1 += prefs[p1][si[i]];
  
    let sum2 = 0;
    for ( let i = 0; i < si.length; i++ ) 
        sum2 += prefs[p2][si[i]];
  
    let sum1Sq = 0;
    for ( let i = 0; i < si.length; i++ )
      sum1Sq += Math.pow(prefs[p1][si[i]], 2);
  
    let sum2Sq = 0;
    for ( let i = 0; i < si.length; i++ )
      sum2Sq += Math.pow( prefs[p2][si[i]], 2 );
  
    let pSum = 0;
    for ( let i = 0; i < si.length; i++ )
      pSum += prefs[p1][si[i]] * prefs[p2][si[i]];
  
    let num = pSum - (sum1 * sum2 / n);
    let den = Math.sqrt((sum1Sq - Math.pow(sum1, 2) / n) *
        (sum2Sq - Math.pow(sum2, 2) / n));
  
    if (den == 0) return 0;
  
    return num / den;
  }
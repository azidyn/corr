

// const m = {
//     'lion': { 'sheep': 99, 'hamster': 1, 'lion': 1 },
//     'hamster': { 'sheep': 123, 'hamster': 1, 'lion': 1 },    
//     'sheep': { 'sheep': 666, 'hamster': 1, 'lion': 1 }
// }

// let transposed = [];

// for ( let key in m ) {

//     let row = m[ key ];

//     let orow = [ key ];
    
//     for ( let ckey in row ) {
//         orow.push( row[ckey] );
//     }

//     transposed.push( orow );

// }

// console.log( transposed )

const Core = require('./core/Core');

let core = new Core( 30 );

core.start();

core.on('matrix', m => {

    console.log( m );

} )


// let matrix = {
//     ATOMBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         BNBBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
     
//         XLMBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         YFIBTC: {
//             XLMBTC: 0,
//             YFIBTC: 1,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 1.0000000003927167,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         XTZBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         ETHBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         XRPBTC: {
//             XLMBTC: 0,
//             YFIBTC: 1.0000000003927167,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 1,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         BCHBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         LTCBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         ETCBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         UMABTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         },
//         DASHBTC: {
//             XLMBTC: 0,
//             YFIBTC: 0,
//             XTZBTC: 0,
//             ETHBTC: 0,
//             XRPBTC: 0,
//             BCHBTC: 0,
//             LTCBTC: 0,
//             ETCBTC: 0,
//             UMABTC: 0,
//             DASHBTC: 0,
//             ATOMBTC: 0,
//             BNBBTC: 0
//         }
//     };


          


//     console.log( matrix )
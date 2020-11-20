
// using a linter; female trait
/* eslint-disable */

const tickers       = require('./cg100new.json');
const Network       = require('./Network');
const CoinManager   = require('./CoinManager');
const EventEmitter  = require('./EventEmitter');


class Core extends EventEmitter {

    // `max` number of coins to create a matrix with
    constructor( max ) { super();

        // written for Binance only, see internals 
        this.network = new Network();

        // which coins we using 
        this.symbols = tickers.map( a => a.ticker );
        this.symbols = this.symbols.slice( 0, max );

        // sample price every 5 seconds ( 5 sec 'bars' basically )
        this.interval = 5000;

        this.coins = new CoinManager();

    }

    start() {

        // kek binance endpoint param convention is retarded look at this shit
        // let bonus = `btcusdt@aggTrade/ethusdt@aggTrade/`;

        let req = this.symbols.map( s => `${s}btc@aggTrade`);

        this.network.connect('binance', req.join('/') );

        this.network.on('data', payload => {
            
            const data = payload.data;
            this.coins.tick( data );            

        });

        // Tell coin manager to sample price at this interval (adjustable at runtime)
        this.coins.sample( this.interval );

        this.coins.on('matrix', matrix => {
            
            // here's the resultant matrix...
            // console.log(matrix);
            this.fire('matrix', matrix);

        });

        

    }

}



module.exports = Core;


// let coins = new CoinManager();

// const network = new Network();

// let symbols = tickers.map( a => a.ticker );
// symbols = symbols.slice( 0, 25 );
// let req = symbols.map( s => `${s}btc@aggTrade`);

// // console.log( req )
// network.connect('binance', req.join('/') )


// // Sample every 5 seconds
// coins.sample( 5000 );

// coins.on('matrix', matrix => {
//     console.log(matrix)
// })


// network.on('data', payload => {
    
//     const data = payload.data;

//     coins.tick( data );
    
// });


// // this.network.connect( this.exchange, req.join('/')  );

// // this.network.on('data', payload => {


const EventEmitter  = require('./EventEmitter');
const Coin          = require("./Coin");

const DEF_INTERVAL = 5000;
const DEF_CORR_LENGTH = 100;

class CoinManager extends EventEmitter {

    constructor() { 
        
        super();

        this.coins = {};
        this.ticks = true;

        this.interval = DEF_INTERVAL;

        this.timer = null;

    }

    correlate() {

        // Generates a 2D array representing a table/matrix with col and row headers
        // cells contain the correlation between pairs

        let output = [];
        let sorted = [];

        for ( let ticker in this.coins )
            sorted.push( ticker );

        // Sorted list of tickers e.g. ['ADA', 'BCH', 'BTC' ... 'XRP' ]
        sorted.sort();

        // Create the table header
        output.push( [' '].concat( sorted ) );

        for ( let y of sorted ) {

            // Row header = y = 'ADA' or whatever
            let row = [ y.replace('BTC','') ];

            for ( let x of sorted ) {
                
                row.push( x == y ? 1 : this.coins[ x ].corr( this.coins[ y ], DEF_CORR_LENGTH ) )

            }

            output.push( row );

        }

        output[0] = output[0].map( m => m.replace('BTC',''));

        return output;

    }

    sample( interval ) {

        this.interval = interval || DEF_INTERVAL;

        // Clear any previous timers
        if ( this.timer )
            clearInterval( this.timer );

        this.timer = setInterval( () => { 

            for ( let pair in this.coins )
                this.coins[ pair ].close(); 
            
            const matrix = this.correlate();
            this.fire( 'matrix', matrix );

        }, this.interval );

    }

    ensure( symbol ) {

        if ( this.coins[ symbol ] ) 
            return;

        this.coins[ symbol ] = new Coin( symbol );

    }

    tick( trade ) {

        this.ensure( trade.symbol );

        this.coins[ trade.symbol ].trade( trade.price ) ;

        // Means are we updating the correlation matrix for every single tick?
        if ( this.ticks )  {
            
            // First poke the latest price
            this.coins[ trade.symbol ].tick( trade.price ) ;

            // Now gen the matrix 
            const matrix = this.correlate();
            this.fire( 'matrix', matrix );
    
        }
       

    }

}

module.exports = CoinManager;
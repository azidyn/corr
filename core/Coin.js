const pcorr = require('./pcorr');
const Series = require('./Series');

const MAX_HISTORY = 1000;

// Class to manage a single market pair e.g. LTCBTC

class Coin {

    constructor( symbol ) {

        this.series = new Series();
        this.symbol = symbol;

        this.price = 0;

        

    }

    // When the interval has closed, print a new price
    close( ) {

        // console.log(`Closing ${this.symbol} @ ${this.price} | ${this.series.get().join(',')}`);

        // Add a new sample to our series using the last traded price
        this.series.append( this.price );

        this.series.trim( MAX_HISTORY );

    }

    // Whenever a new price comes in update the lastest value in the series, regardless of resolution/interval
    tick( price ) {
        
        this.series.poke( price );
     
    }
    
    // Keep a copy of this pair's latest traded price
    trade( price ) {
        
        this.price = price;

    }

    history( length ) {
        
        return this.series.get( length );

    }

    len( ) {
        return this.series.len();
    }

    corr( coin, length=10 ) {

        let shortest = Math.min( this.len(), coin.len() );

        // Need at last two sample on each pair to calc correlation
        if ( shortest < 2 )
            return 0;

        let l = Math.min( shortest, length );

        const c =  pcorr( this.history( l ), coin.history( l ) );

        return Math.min( 1, Math.max( -1, c ) );

    }

    
    
}


module.exports = Coin;
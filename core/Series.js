
// Class to manage a time series of sample measurements.
// Reason we need this over a simple array is to cleanly manage the poke() of recent data

class Series {

    constructor() {

        this.poked = false;
        this.data = [];

    }

    
    len() {
        
        return this.data.length;

    }


    // Make sure we don't grow too much
    trim( max ) {

        this.data = this.data.slice( -max );
    }


    // Return the current series to a given lookback
    get( length ) {
        return length ? this.data.slice( -length ) : this.data;
    }


    append( value ) {

        if ( this.poked ) {
            this.data[ this.data.length - 1 ] = value;
        } else {
            this.data.push( value );
        }
        
        this.poked = false;
    }


    poke( value ) {

        if ( this.poked )
            this.data[ this.data.length - 1 ] = value;
        else
            this.data.push( value ); 

        this.poked = true;

    }
}

module.exports = Series;
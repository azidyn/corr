

const EXCHANGE = {};

EXCHANGE['binance'] = agg => {

    let Q = Number( agg.q ), P = Number( agg.p );

    return { 
        symbol: agg.s,
        size: { 
            base: Q,
            quote: Q * P,
        },
        price: P,
        direction: agg.m ? 'sell' : 'buy',
        timestamp: Number( agg.E ), // ms epoch
        blank: false
    };

}

class Packet {
    constructor() {}

    parse( exchange, data ) {

        // console.log(`exchange=${exchange}`);
        // console.log(data);

        const parsed = JSON.parse( data );
      
        return EXCHANGE[ exchange ]( parsed );
    }

}

module.exports = Packet;
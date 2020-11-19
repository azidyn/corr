
const BINANCE_WS = `wss://stream.binance.com:9443`;

const WebSocket     = require('isomorphic-ws');
const EventEmitter  = require('./EventEmitter');
const Packet        = require('./Packet');


class Network extends EventEmitter {

    constructor() {
        
        super();

        this.ws = null;
        this.exchange = '';
        this.packet = new Packet();

    }

    connect( exchange, params ) {

        this.exchange = exchange;

        switch( exchange ) {
            case 'binance':
                const uri = `${BINANCE_WS}/ws/${params}`;
                this.ws = new WebSocket( uri );
                break;
            default: 
                throw 'Unsupported exchange';
        }


        this.ws.onopen = () => {
            console.info(`${exchange}:connected`);
            this.fire('connected');
         };
         
        this.ws.onclose = () => {
            console.warn(`${exchange}:disconnected`);
            
            this.ws = new WebSocket(`${BINANCE_WS}/ws/${params}`);

            this.fire('disconnected');
        };
         
        this.ws.onmessage = msg => {

            let size = msg.data.length;

            const data = this.packet.parse( this.exchange, msg.data );

            this.fire( 'data', { data, size } );

            //  let agg = JSON.parse( msg.data )
          
            //  let c = column.find( f => f.binance == agg.s );
     
            //  if ( c ) {

            //      c.data.push({ 
            //          size: { 
            //              base: agg.q,
            //              quote: agg.q * agg.p
            //          },
            //          price: agg.p,
            //          direction: agg.m ? 'sell' : 'buy',
            //          timestamp: Number( agg.E)
            //      });
             
            //      c.data = c.data.slice( -MAX_HISTORY );    
            //  }
     
        
         };          



    }



}


module.exports = Network;

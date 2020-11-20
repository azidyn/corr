
const BINANCE_WS = `wss://stream.binance.com:9443`;

const WebSocket     = require('isomorphic-ws');
const EventEmitter  = require('./EventEmitter');
const Packet        = require('./Packet');

let _temp;

const DEF_THROTTLE_ETHUSDT = 15, DEF_THROTTLE_BTCUSDT = 25;
const DEF_THROTTLE_ALT = 5;

let _eth_ctr = 1, _btc_ctr = 1;
const _alt_ctr = {};


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

            // let size = msg.data.length;
            // const data = this.packet.parse( this.exchange, msg.data );
            // _parse( msg.data )

            _temp = JSON.parse( msg.data );

            /*
                 Throttle pairs. Waaaay too many trades for JS garbage collector to
                 handle it's like a fucking firehose.
            */

            if ( _temp.s == 'ETHUSDT') 
            {
                if ( _eth_ctr++ % DEF_THROTTLE_ETHUSDT == 0 ) {
                    _eth_ctr = 1;
                    this.fire( 'data', _temp.s, Number( _temp.p ) );
                }

            } else if ( _temp.s == 'BTCUSDT')  {

                if ( _btc_ctr++ % DEF_THROTTLE_BTCUSDT == 0 ) {
                    _btc_ctr = 1;
                    this.fire( 'data', _temp.s, Number( _temp.p ) );
                }

            } else {

                if ( !_alt_ctr[ _temp.s ] )
                    _alt_ctr[ _temp.s ] = 0; // allow first one through

                if ( _alt_ctr[ _temp.s ]++ % DEF_THROTTLE_ALT == 0 ) {
                    _alt_ctr[ _temp.s ] = 1;
                    this.fire( 'data', _temp.s, Number( _temp.p ) );
                }
            }

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

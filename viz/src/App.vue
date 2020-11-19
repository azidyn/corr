<template>
  <div id="app">
    <table id='corrtable'>
      <!-- <caption>correlation</caption> -->
        <tr v-for=" (row, indexrow) in matrix " :key="rkey(indexrow)" >
            <td v-for=" ( col, indexcol ) in row " :key="tkey(row, indexcol)" :title="title(indexrow, indexcol)" :style="getcol( col )">{{ roundnum( col ) }} </td>
        </tr>

    </table>
  </div>
</template>

<script>
 /* eslint-disable */


import HelloWorld from './components/HelloWorld.vue'

import Core from '../../core/Core';

 export default {
  name: 'App',
  components: {
    
  },

  methods: {

    rkey: function( index ) {
      return `__ROW_${index}`;
    },

    tkey: function(sym, index) {
      let s = sym[0];
      if ( s.trim() == '' ) s = '__HEADER';
      const id = `${s}_${index}`;
      return id;
    },

    roundnum: function( value ) {

      // HACK: js is retarded
      if ( value == ' ') return value;

      if ( isNaN( value ) ) return value;

      let n = Number( value );
      
      return n.toFixed( 3 );


    },

    title: function( row, col ) {

      let a = this.matrix[row][0];
      let b = this.matrix[0][col];
      return `${a} x ${b}`;

    },

    getcol: function( value ) {

      // return `background-color: rgba(255,0,0,1)`;
      if ( isNaN( value ) ) return 'background-color: rgba(0,0,0,1)';
      let n = Number( value );

      if ( n > 0  ) {
        let g = Math.min( 255, Math.round( 255 * n ) );
        let borw = n > 0.65 ? 'black' : 'white';
        return `color: ${borw}; background-color: rgba(0,${g},0,1)`;
      }

      if ( n < 0  ) {
        let r = Math.min( 255, Math.round( 255 * n * -1 ) );
        let borw = n < -0.65 ? 'black' : 'white';
        return `color: ${borw}; background-color: rgba(${r},0,0,1)`;

      }

      return 'background-color: rgba(0,0,0,1)';

    }

  },

  data: function () { 
    return {
       core: null,
       matrix: null,
       counter: 0
    }
  },

  mounted( ) {

    this.core = new Core( 30 );

    this.core.on('matrix', matrix => {
      // if ( this.counter++ < 5 )
        
        this.matrix = matrix 

    });

    this.core.start();

  }

}
</script>

<style>

#corrtable {
  width: 100%
}

#app {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  /* -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; */
  text-align: center;
  color:white;
  font-weight: 200;
  
  /* margin-top: 60px; */
}

body{
  font-family: "Trebuchet MS", Tahoma ;
  font-size: 10pt;
   background-color: black; 
}

td { 
    padding: 2px;
    margin: 0;
    border: 0;
}

table { 
    border-spacing: 0px;
    border-collapse: separate;
}

</style>

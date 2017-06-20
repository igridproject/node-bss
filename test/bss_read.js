var async = require('async');
var BinStream = require('../binarystream');

var FNAME = "D:\\testfile\\BSDATA\\igrid\\env.bss";


// BinStream.open(FNAME,function(err,bss){
//
//   var rd = bss.reader();
//   var cont = true;
//   var idx=0;
//   async.whilst(
//       function() { return cont; },
//       function(callback) {
//
//         rd.nextObject(function(err,obj){
//           if(!obj){
//             cont=false;
//           }else{
//             idx++;
//             if(idx%100000 == 0){
//               console.log(idx);
//             }
//             //meta = obj.meta;
//             //console.log(obj.data);
//           }
//           callback();
//         });
//
//       },function(err){
//         bss.close(function(err){
//           console.log('close');
//         });
//       });
//
// });


BinStream.open(FNAME,function(err,bss){

  var rd = bss.reader();
  var cont = true;
  var idx=0;
  var tA = (new Date()).getTime();
  var count=0;
  async.whilst(
      function() { return cont; },
      function(callback) {

        rd.nextObject(function(err,obj){
          if(!obj){
            cont=false;
            callback();
          }else{
              var strLight = obj.data.light
              if(strLight && Number(strLight)>90){count++}

              if((++idx)%100000 == 0){
                console.log(obj);
              }
              callback();
          //  });
            //meta = obj.meta;
            //console.log(obj.data);
          }
          //callback();
        });

      },function(err){
        bss.close(function(err){
          var tB = (new Date()).getTime();
          console.log(tB-tA);
          console.log('close');
          console.log(count);
        });
      });

});

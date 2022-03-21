
// import "./Zoom.css";
// import { ZoomMtg } from "@zoomus/websdk";
// import { useEffect } from "react";
// // import "./App.css";
// import "./style.css";
// // import time from time;
// // import crypto from "../../../package.json/dependencies/crypto";
// // import { Crypto } from 'crypto-js';

// // const stream = require.resolve("stream-browserify")

// // const API_KEY = "mrvk446IRhyc6dFFxOoOfQ"
// // const API_SEC = 'cvaBfMFpQDOT9TfFOq6TeW6xGOS7TZGyslLl'
// // const API_CHT = 'eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJVQmxkVklRNlNUV1lHQ1JRdjV3cExRIn0.u4k2eoi6_JgtuNfOO8N8VgXluJIMP_bKOBNuKnkwvks'
// // const JWT_TOK = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6Im1ydms0NDZJUmh5YzZkRkZ4T29PZlEiLCJleHAiOjE2NDY3OTgyNTMsImlhdCI6MTY0Njc5Mjg1M30.V6fpiEXIlAiNRWzK5n0CA1a2rhKtZvQbkQdZQ6RSyBo'


// const Buffer = require('buffer/').Buffer;
// // const CryptoJS = require.resolve('crypto-browserify');
// // const crypto = require('crypto');
// const crypto = require.resolve('crypto-browserify');
// // const CryptoJS = require.resolve('crypto.js');
// // const hash = require('hash.js')
// // const createHmac = require('create-hmac');



// function generateSignature(apiKey, apiSecret, meetingNumber, role){
//     return new Promise((res, rej) => {
//     // console.log("1");
//     // const algo = 'sha256';
    
//     const timestamp = new Date().getTime() - 30000;
//     // console.log("2");
//     const msg = Buffer.from(apiKey + meetingNumber + timestamp + 1).toString('base64');
//     // const msg = (apiKey + meetingNumber + timestamp + '1').toString();
//     console.log(msg);
//     // console.log("3");


//     // console.log(msg);
//     // console.log(apiSecret);
//     // const yuuu = crypto.createHmac('sha256',"cvaBfMFpQDOT9TfFOq6TeW6xGOS7TZGyslLl");
//     // console.log(yuuu);
//     const hash = crypto
//         .createHmac(apiSecret, 'sha256')
//         .update(msg)
//         .digest('base64');
   
  
//     // console.log("problem");
//     // console.log("4");

//     // const signature = Buffer.from(
//     //     `${apiKey}.${meetingNumber}.${timestamp}.${role}.${hash}`).toString('base64');
//     // console.log(msg);

//     // console.log("ABOVE");
//     // console.log("SIGNATURE: " + signature);
//     // console.log("TYPE: "+ typeof(signature));
//     // console.log("BELOW");

    


//     // res('0af4cad3f36be1c45c96b852afa5f0e124ea8bcc8510b29c6ecf2b4400e82d32');
//     res(signature);
//     });
// }


// // var signatureEndpoint = 'http://localhost:3000';
// var apiKey = "mrvk446IRhyc6dFFxOoOfQ";
// var apiSecret = "cvaBfMFpQDOT9TfFOq6TeW6xGOS7TZGyslLl";
// // var meetingNumber = 123456789;
// var meetingNumber = '82352549824';
// var leaveUrl = 'http://localhost:3000'; //redirect to homepage TODO
// var userName = 'WebSDK';
// var userEmail = 'ksudoctorone@gmail.com';
// var passWord = '0Y4JVa';
// var signature = '';
// generateSignature(apiKey, apiSecret, meetingNumber, 0)
//   .then((res) => {
//     signature = res;
//   })
//   ;
// // console.log(generateSignature((apiKey, apiSecret, meetingNumber, 0)))


// const Zoom =  () => {
//     useEffect(() => {
//         showZoomDIv();
//         ZoomMtg.setZoomJSLib('https://source.zoom.us/1.9.0/lib', '/av');
//         ZoomMtg.preLoadWasm();
//         ZoomMtg.prepareJssdk();
//         initiateMeeting();
//     }, [])

//     const showZoomDIv = () => {
//         document.getElementById('zmmtg-root').style.display = 'block';
//     }

//     const initiateMeeting = () => {

//         ZoomMtg.init({
//             leaveUrl: leaveUrl,
//             isSupportAV: true,
//             success: (success) => {
//               console.log(success)
          
//               ZoomMtg.join({
//                 signature: signature,
//                 meetingNumber: meetingNumber,
//                 userName: userName,
//                 apiKey: apiKey,
//                 userEmail: userEmail,
//                 passWord: passWord,
//                 success: (success) => {
//                   console.log(success)
//                 },
//                 error: (error) => {
//                   console.log(error)
//                 }
//               })
          
//             },
//             error: (error) => {
//               console.log(error)
//             }
//           })
//     };




//     return <div className="zoomDiv">Zoom</div>;
// };


// export default Zoom;





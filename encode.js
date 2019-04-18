const b64 = require('base64-async');
const fs = require('fs');
const buffer = fs.readFileSync('21_51_40_items.json.gz');
 
b64.encode(buffer).then(b64String => console.log(b64String));
// aGkgbXVt...
 
//b64.decode(b64String).then(buffer => console.log(buffer));
// <Buffer 68 69 20 6d 75 6d ... >
 
// or, for the cool kids
//const b64String = await b64.encode(buffer);
//const buffer = await b64.decode(b64String);
 
// which is equivalent to this
//const b64String = await b64(buffer);
//const buffer = await b64(b64String);
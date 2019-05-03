const fs = require('fs');
const b64 = require('base64-async');
const moment = require('moment');
const path = require('path');
const util = require('util');
const {gzip, ungzip} = require('node-gzip');

const {items} = require('./items');

moment.locale('pl');

const writeFile = util.promisify(fs.writeFile);
const readFile = util.promisify(fs.readFile);

const saveToFile = async function (content, dirPath) {
  try {
    const compressed = await gzip(JSON.stringify(content));
    const fileSaved = await writeFile(dirPath, compressed);
    const fileBuffer  = await fs.readFileSync(dirPath);
    console.log(fileBuffer)
    const contents_in_base64 = await fileBuffer.toString('base64');
    console.log(contents_in_base64)
  } catch (e) {
    console.log('err: ' + e)
  }
}

const dirPath = path.join('data', '2019', '05', '02',
                moment().format('HH_mm_ss') + '_items.json.gz')
saveToFile(items, dirPath)

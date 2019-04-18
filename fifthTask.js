const fs = require('fs');
const zlib = require('zlib');
const moment = require('moment');

const {items} = require('./items');

moment.locale('pl');
const gzip = zlib.createGzip();

const createDir = (path) => {
  if (!fs.existsSync(path)) {
      fs.mkdirSync(path);
  }
}

const compress = (r, w) => {r.pipe(gzip).pipe(w)};

const saveToFile = async function (items) {
  const content = JSON.stringify(items);
  const compressedContent = zlib.gzip(content, function (error, result) {
     if (error) throw error;
       console.log(result);
  });

  const currentDate = moment();
  const currentTime = currentDate.format('HH_mm_ss');
  const dir = './fifthTaskFiles/';
  createDir(dir);
  let currentPath = dir + currentDate.format('YYYY') + 'b';
  createDir(currentPath);
  currentPath = currentPath + '/' + currentDate.format('MM');
  createDir(currentPath);
  currentPath = currentPath + '/' + currentDate.format('DD');
  createDir(currentPath);

  const filenameWithPath = currentPath + '/' + currentTime + '_items.json'

  const f = await fs.writeFile(filenameWithPath, content,
    function (e) {
      if (e) throw e;
      console.log('File is created successfully.');
  });

  const r = await fs.createReadStream(filenameWithPath);
  const w = await fs.createWriteStream(filenameWithPath + '.gz');
  const c = await compress(r, w);

  const filenameToEncode = filenameWithPath + '.gz'
  console.log('path: ' + filenameToEncode);
  const fileToEncode = await fs.readFileSync(filenameToEncode);
  async()=>(await fileToEncode.toString('base64'))
  async()=>console.log(await 'file: ' + fi);
}

saveToFile(items);

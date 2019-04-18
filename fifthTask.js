const fs = require('fs');
const b64 = require('base64-async');
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

const compressFile = (path) => {
  console.log('compressing file');
  return new Promise(resolve => {
    resolve(fs.createReadStream(path).pipe(gzip)
    .pipe(fs.createWriteStream(path + '.gz')));
  });
};

const readFileToEncode = (path) => {
  console.log('reading file from path: ' + path);
  return new Promise(resolve => {
    resolve(fs.readFileSync(path));
  })
  .then((buffer) => {
    b64.decode(b64String).then(buffer => console.log(buffer))
  })//console.log("RESOLVED"))
  .catch(() => console.log("REJECTED"));
};

const encodeFile = (buffer) => {
  console.log(path+'encoding file: ' + buffer);
  return new Promise((resolve, reject) => {
    resolve(b64.encode(buffer));
    reject(new Error("…"));
  });
};

const createDirName = (currentDate) => {
  const dir = './fifthTaskFiles/';
  createDir(dir);
  let currentPath = dir + currentDate.format('YYYY') + 'b';
  createDir(currentPath);
  currentPath = currentPath + '/' + currentDate.format('MM');
  createDir(currentPath);
  currentPath = currentPath + '/' + currentDate.format('DD');
  createDir(currentPath);
  return currentPath;
}

const saveToFile = (content) => {
  const currentDate = moment();
  const currentTime = currentDate.format('HH_mm_ss');
  const path = createDirName(currentDate);
  const filenameWithPath = path + '/' + currentTime + '_items.json'
  const filenameToEncode = filenameWithPath + '.gz'

  const f = fs.writeFile(filenameWithPath, content,
    function (e) {
      if (e) throw e;
      console.log('File is created successfully.');
  })
  return {filenameWithPath, filenameToEncode}
};

const getBuffer = async function(filenameWithPath, filenameToEncode) {
  const file = await compressFile(filenameWithPath);
  const buffer = await readFileToEncode(filenameToEncode)
  console.log(buffer)
  return buffer;
}

const filePaths = saveToFile(JSON.stringify(items));
const buffer = getBuffer(filePaths.filenameWithPath, filePaths.filenameToEncode)
console.log(typeof(buffer))
// const b64String = b64.encode(buffer)
// console.log(b64String)
// /console.log(filePaths.filenameWithPath + ' ' + filePaths.filenameToEncode + ' ' + buffer);

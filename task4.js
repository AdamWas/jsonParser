const _ = require('lodash')

const {itemsMod} = require('./itemsMod');

const IsJsonStr = json => {
    const str = json.toString();
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};

console.log('Valid JSON:')
console.log(IsJsonStr(itemsMod));

if (IsJsonStr(itemsMod)) {
  const items = JSON.parse(itemsMod);
  if (items.data) {
    const verified = items.data.map(item => _.pick(item, [
      'type',
      'pos',
      'cost',
      'amount'
    ]));
    console.log('Orginal data:');
    console.log(items.data);
    console.log('Verified data:');
    console.log(verified);
  } else {
    console.log('Invalid data!');
  };
} else {
  console.log('Invalid JSON!');
};

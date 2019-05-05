const _ = require('lodash');
const Schema = require('validate');

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

const itemsData = new Schema({
  items: {
    data: [{
      type: {
        type: String,
        required: true,
        length: {min:1, max:2}
      },
      pos: {
        type: Array,
        each: { type: Number }
      },
      cost: {
        type: Number,
        required: true
      },
      amount: {
        type: Number,
        required: true
      }
    }]
  }
})

console.log('Valid JSON (lodash):')
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

console.log('Valid JSON (validate):')
const errors = itemsData.validate(itemsMod)
console.log(errors.length > 0 ? errors : 'Valid object');

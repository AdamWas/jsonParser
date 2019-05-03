const {items} = require('./items');

const lessThenValue = value => {
	return value < 5;
}

const filterAmount = obj => {
	const filteredAmount = items.data.map(item => item.amount).filter(lessThenValue);
	return filteredAmount;
}

console.log(filterAmount(items))

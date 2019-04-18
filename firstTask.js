const {items} = require('./items');

const totals = obj => {
	const costSum = items.data.map(item => item.cost).reduce((a, b) => a + b);
	const costAmount = items.data.map(item => item.amount).reduce((a, b) => a + b);
	return { total_cost: costSum, total_amount: costAmount };
}

console.log(totals(items))

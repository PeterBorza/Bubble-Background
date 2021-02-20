const p = console.log;
const form = document.querySelector('.form');

const getCircles = async () => {
	const uri = 'http://localhost:3000/circles';
	const response = await fetch(uri);
	const circles = await response.json();
	return circles;
};

const myCircles = async () => {
	try {
		const circles = await getCircles();
		renderCircles(circles);
	} catch (err) {
		p('rejected:', err.message);
	}
};

window.addEventListener('DOMContentLoaded', () => myCircles());

// *********************************************************

const inputs = document.querySelectorAll('input');

const rangeFollower = (input, unit) => {
	input.addEventListener('change', () => {
		input.previousElementSibling.innerHTML = `${input.value}${unit}`;
	});
	input.addEventListener('mousemove', () => {
		input.previousElementSibling.innerHTML = `${input.value}${unit}`;
	});
};

inputs.forEach(input => {
	let name = input.getAttribute('name');
	if (name == 'left' || name == 'top') {
		rangeFollower(input, '%');
	} else if (name == 'size') {
		rangeFollower(input, 'rem');
	} else {
		rangeFollower(input, '');
	}
});

const renderCircle = async e => {
	e.preventDefault();
	const circle = {
		left: Number(form.left.value),
		top: Number(form.top.value),
		size: Number(form.size.value),
		opacity: Number(form.opacity.value),
	};

	await fetch('http://localhost:3000/circles/', {
		method: 'POST',
		body: JSON.stringify(circle),
		headers: { 'Content-Type': 'application/json' },
	});
};

form.addEventListener('submit', renderCircle);

// *************************************************

const renderCircles = data => {
	data.map(item => {
		const leftList = document.getElementById('left-list');
		const topList = document.getElementById('top-list');
		const sizeList = document.getElementById('size-list');
		const opacityList = document.getElementById('opacity-list');
		const { id, left, top, size, opacity } = item;
		createListItem(left, leftList);
		createListItem(top, topList);
		createListItem(size, sizeList);
		createListItem(opacity, opacityList);
	});
};

const createListItem = (item, parentItem) => {
	const listElement = document.createElement('li');
	listElement.innerHTML = item;
	parentItem.append(listElement);

	return listElement;
};
// *****************************************************

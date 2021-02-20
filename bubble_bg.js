const sectionBubbles = document.querySelector('.section-bubbles');
const changColorBtn = document.querySelector('.change-color-btn');

const getBubbles = async () => {
	const response = await fetch('http://localhost:3000/circles');

	if (response.status !== 200) {
		throw new Error('cannot fetch the data');
	}

	const data = await response.json();

	return data;
};
const myBubbles = async () => {
	try {
		const data = await getBubbles();
		renderData(data);
		renderCirclesIds(data);
	} catch (err) {
		p('rejected:', err.message);
	}
};

window.addEventListener('DOMContentLoaded', () => myBubbles());

// *******************************************************
// *******************************************************
const renderData = data => data.map(renderBg);

const renderBg = ({ left, top, opacity, size }) => {
	const div = document.createElement('div');
	div.classList.add('bubble');
	div.style.left = `${left}%`;
	div.style.top = `${top}%`;
	div.style.opacity = opacity;
	div.style.width = `${size}`;
	div.style.height = `${size}`;
	div.style.position = 'absolute';
	div.style.borderRadius = '50%';
	createColors(div);
	div.style.boxShadow =
		'inset 0 0 50px rgba(194, 188, 188, 0.479), 0 0 15px rgba(0,0,0,0.6)';
	// div.style.filter = 'blur(1px)';
	div.style.zIndex = '1';

	sectionBubbles.append(div);

	changColorBtn.addEventListener('click', () => createColors(div));

	return div;
};

// ***************************************************

const randomize = n => `#${Math.floor(Math.random() * n)}`;
const createColors = element => {
	element.style.backgroundColor = `${randomize(1000000)}`;
};

const nav = document.querySelector('nav');
const renderCirclesIds = data => {
	const idList = data.map(item => item.id);
	const maxVal = Math.max(...idList);
	const deleteBtn = document.createElement('button');
	deleteBtn.innerHTML = 'Delete';
	nav.append(deleteBtn);
	deleteBtn.addEventListener('click', async e => {
		const res = await fetch('http://localhost:3000/circles/' + maxVal, {
			method: 'DELETE',
		});
	});
};

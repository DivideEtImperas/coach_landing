// Карусель блока боли
const carousel = document.querySelector('.carousel');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (carousel && prevBtn && nextBtn) {
	const getScrollAmount = () => Math.min(320, carousel.clientWidth * 0.85);

	prevBtn.addEventListener('click', () => {
		carousel.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
	});

	nextBtn.addEventListener('click', () => {
		carousel.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
	});
}

// Анимация тегов только на экранах, где есть hover
const tags = document.querySelectorAll('.reality-tags .tag');
const initialPositions = [
	{ top: '28px', left: '18%' },
	{ top: '96px', left: '25%' },
	{ top: '28px', left: '58%' },
	{ top: '96px', left: '62%' }
];

function resetRealityTags() {
	tags.forEach((tag, index) => {
		if (window.matchMedia('(max-width: 768px)').matches) {
			tag.removeAttribute('style');
			return;
		}

		const position = initialPositions[index] || initialPositions[0];
		tag.style.top = position.top;
		tag.style.left = position.left;
		tag.style.transform = 'none';
	});
}

resetRealityTags();
window.addEventListener('resize', resetRealityTags);

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
	tags.forEach(tag => {
		tag.addEventListener('mouseenter', () => {
			const currentTop = parseInt(tag.style.top, 10) || 0;
			const targetStack = 160 + Math.random() * 30;
			const randomX = (Math.random() - 0.5) * 220;
			const rotate = (Math.random() - 0.5) * 28;
			let fallDistance = currentTop;

			function animate() {
				if (fallDistance < targetStack) {
					fallDistance += 5;
					tag.style.top = fallDistance + 'px';
					tag.style.left = `calc(50% + ${randomX}px)`;
					tag.style.transform = `translateX(-50%) rotate(${rotate}deg)`;
					requestAnimationFrame(animate);
				}
			}

			animate();
		});
	});
}

window.addEventListener('scroll', () => {
	if (window.scrollY > 100) resetRealityTags();
});
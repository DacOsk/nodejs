const btn = document.querySelector('#add-camp')
const modal = document.querySelector('.modal');

btn.addEventListener('click', () => {
    modal.classList.remove('hidden');
});
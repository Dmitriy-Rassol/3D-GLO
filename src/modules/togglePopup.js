const togglePopup = () => {
    const popup = document.querySelector('.popup'),
        popupBtn = document.querySelectorAll('.popup-btn'),
        popupContent = document.querySelector('.popup-content');

    let popupContentInterval,
        count = 100;
    const animationSpeed = 10;

    const popupContentAnimate = () => {
        popupContentInterval = requestAnimationFrame(popupContentAnimate);
        count -= animationSpeed;
        if (count < 0) {
            cancelAnimationFrame(popupContentInterval);
        }
        popupContent.style.marginTop = count + 'px';
    };

    popupBtn.forEach(item => {
        item.addEventListener('click', () => {
            popup.style.display = 'block';
            const width = document.documentElement.clientWidth;
            if (width >= 768) {
                popupContentAnimate();
            }
        });
    });

    popup.addEventListener('click', e => {
        const target = e.target;
        if (target.classList.contains('popup-close') || !target.closest('.popup-content')) {
            popup.style.display = 'none';
            count = 150;
        }
    });
};

export default togglePopup;
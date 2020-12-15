const toggleScroll = () => {
    const menuLinks = document.querySelectorAll('menu a'),
        mainBtnDown = document.querySelector('main a');

    const getScroll = item => {
        item.addEventListener('click', e => {
            e.preventDefault();
            const blockID = item.getAttribute('href');
            document.querySelector(blockID).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    };

    menuLinks.forEach(link => {
        getScroll(link);
    });

    getScroll(mainBtnDown);

};

export default toggleScroll;
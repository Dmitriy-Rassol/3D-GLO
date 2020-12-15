const toggleMenu = () => {
    const menu = document.querySelector('menu');

    const handlerMenu = () => {
        menu.classList.toggle('active-menu');
    };

    document.body.addEventListener('click', e => {
        const target = e.target,
            closestBtnMenu = target.closest('.menu'),
            closestCloseBtn = target.closest('.close-btn'),
            closestMenuItems = target.closest('.active-menu ul>li'),
            closestActiveMenu = target.closest('.active-menu');

        if (closestBtnMenu || closestCloseBtn || closestMenuItems) {
            handlerMenu();
        }

        if (!closestActiveMenu && !closestBtnMenu) {
            menu.classList.remove('active-menu');
        }
    });

};
export default toggleMenu;
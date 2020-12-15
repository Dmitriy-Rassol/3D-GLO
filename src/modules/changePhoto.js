const changePhoto = () => {
    const commandPhoto = document.querySelectorAll('.command__photo');

    commandPhoto.forEach(elem => {
        const scrImg = elem.getAttribute('src');

        elem.addEventListener('mouseenter', event => {
            const target = event.target;
            target.src = target.dataset.img;
        });

        elem.addEventListener('mouseout', event => {
            const target = event.target;
            target.src = scrImg;
        });
    });
};

export default changePhoto;
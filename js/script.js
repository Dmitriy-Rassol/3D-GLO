window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';

    // Таймер
    const countTimer = deadline => {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes =  document.querySelector('#timer-minutes'),
            timerSeconds =  document.querySelector('#timer-seconds');

        const getTimeRemeaning = () => {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return { timeRemaining, hours, minutes, seconds };
        };

        const modifyZeroDate = inputDate => {
            if (inputDate >= 0 && inputDate < 10) {
                return '0' + inputDate;
            }
            return inputDate;
        };

        const updateClock = () => {
            const timer = getTimeRemeaning();
            timerHours.textContent = modifyZeroDate(timer.hours);
            timerMinutes.textContent = modifyZeroDate(timer.minutes);
            timerSeconds.textContent = modifyZeroDate(timer.seconds);
            const idSetAnimation = requestAnimationFrame(updateClock, 1000);
            if (timer.timeRemaining <= 0) {
                cancelAnimationFrame(idSetAnimation);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
        };
        updateClock();
    };

    countTimer('1 jan 2021');

    // меню

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

    toggleMenu();

    // popup

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

    togglePopup();

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

    toggleScroll();

    // табы

    const tabs = () => {
        const tabHeader = document.querySelector('.service-header'),
            tab = tabHeader.querySelectorAll('.service-header-tab'),
            tabContent = document.querySelectorAll('.service-tab');

        const toggleTabContent = index => {
            for (let i = 0; i < tabContent.length; i++) {
                if (index === i) {
                    tab[i].classList.add('active');
                    tabContent[i].classList.remove('d-none');
                } else {
                    tab[i].classList.remove('active');
                    tabContent[i].classList.add('d-none');
                }
            }
        };

        tabHeader.addEventListener('click', e => {
            let target = e.target;
            target = target.closest('.service-header-tab');

            if (target) {
                tab.forEach((item, i) => {
                    if (item === target) {
                        toggleTabContent(i);
                    }
                });
            }
        });
    };

    tabs();

    // слайдер

    const slider = () => {
        const slider = document.querySelector('.portfolio-content'),
            slide = document.querySelectorAll('.portfolio-item'),
            dots = document.querySelector('.portfolio-dots');

        let currentSlide = 0,
            dot,
            interval;

        const createDot = () => {
            dot = document.createElement('li');
            dot.classList.add('dot');
            for (let i = 0; i < slide.length; i++) {
                dot = dot.cloneNode(true);
                dots.append(dot);
            }

            dot = document.querySelectorAll('.dot');
            dot[0].classList.add('dot-active');
        };

        createDot();

        const prevSlide = (elem, index, strClass) => {
            elem[index].classList.remove(strClass);
        };

        const nextSlide = (elem, index, strClass) => {
            elem[index].classList.add(strClass);
        };

        const autoPlaySlide = () => {

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');
            currentSlide++;

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }
            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');

        };

        const startSlide = (time = 3000) => {
            interval = setInterval(autoPlaySlide, time);
        };

        const stopSlide = () => {
            clearInterval(interval);
        };

        slider.addEventListener('click', e => {
            e.preventDefault();

            const target = e.target;

            if (!target.matches('.portfolio-btn, .dot')) {
                return;
            }

            prevSlide(slide, currentSlide, 'portfolio-item-active');
            prevSlide(dot, currentSlide, 'dot-active');

            if (target.matches('#arrow-right')) {
                currentSlide++;
            } else if (target.matches('#arrow-left')) {
                currentSlide--;
            } else if (target.matches('.dot')) {
                dot.forEach((item, index) => {
                    if (item === target) {
                        currentSlide = index;
                    }
                });
            }

            if (currentSlide >= slide.length) {
                currentSlide = 0;
            }

            if (currentSlide < 0) {
                currentSlide = slide.length - 1;
            }

            nextSlide(slide, currentSlide, 'portfolio-item-active');
            nextSlide(dot, currentSlide, 'dot-active');
        });

        slider.addEventListener('mouseover', (e) => {
            if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
                stopSlide();
            }
        });

        slider.addEventListener('mouseout', (e) => {
            if (e.target.matches('.portfolio-btn') || e.target.matches('.dot')) {
                startSlide();
            }
        });

        startSlide(3000);

    };

    slider();

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

    changePhoto();

    const checkInputCalc = () => {
        const calcBlock = document.querySelector('.calc-block');
    
        calcBlock.addEventListener('input', event => {
            const target = event.target;
            const input = target.closest('input');
    
            if (input) {
                input.value = input.value.replace(/\D/, '');
            }
        });
    };

    checkInputCalc();
});

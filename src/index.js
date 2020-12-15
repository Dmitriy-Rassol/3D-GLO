

import 'nodelist-foreach-polyfill';
import '@babel/polyfill';
import 'formdata-polyfill';
import 'es6-promise';
import 'fetch-polyfill';
import 'smoothscroll-polyfill';
import 'regexp-polyfill';
import elementClosest from 'element-closest';
elementClosest(window);

(function(arr) {
    arr.forEach(item => {
        if (item.hasOwnProperty('append')) {
            return;
        }
        Object.defineProperty(item, 'append', {
            configurable: true,
            enumerable: true,
            writable: true,
            value: function append() {
                const argArr = Array.prototype.slice.call(arguments),
                    docFrag = document.createDocumentFragment();

                argArr.forEach(argItem => {
                    const isNode = argItem instanceof Node;
                    docFrag.appendChild(isNode ? argItem : document.createTextNode(String(argItem)));
                });

                this.appendChild(docFrag);
            }
        });
    });
})([Element.prototype, Document.prototype, DocumentFragment.prototype]);


import countTimer from './modules/countTimer';
import toggleMenu from './modules/toggleMenu';
import togglePopup from './modules/togglePopup';
import toggleScroll from './modules/toggleScroll';
import tabs from './modules/tabs';
import slider from './modules/slider';
import changePhoto from './modules/changePhoto';
import calc from './modules/calc';
import sendForm from './modules/sendForm';

// Тайме
countTimer('1 jan 2021');

// menu
toggleMenu();

// popup
togglePopup();

//scrool
toggleScroll();

// табы
tabs();

// слайдер
slider();

//меняем фото при наведении
changePhoto();

// калькулятор
calc(100);

//отправка формы
sendForm('form1');
sendForm('form2');
sendForm('form3');

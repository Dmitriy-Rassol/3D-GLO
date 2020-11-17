window.addEventListener('DOMContentLoaded', () => {
    // eslint-disable-next-line strict
    'use strict';
    function countTimer(deadline) {
        const timerHours = document.querySelector('#timer-hours'),
            timerMinutes =  document.querySelector('#timer-minutes'),
            timerSeconds =  document.querySelector('#timer-seconds');

        function getTimeRemeaning() {
            const dateStop = new Date(deadline).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                seconds = Math.floor(timeRemaining % 60),
                minutes = Math.floor((timeRemaining / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60);

            return { timeRemaining, hours, minutes, seconds };
        }

        function modifyZeroDate(inputDate) {
            if (inputDate >= 0 && inputDate < 10) {
                return '0' + inputDate;
            }
            return inputDate;
        }

        function updateClock() {
            const timer = getTimeRemeaning();
            timerHours.textContent = modifyZeroDate(timer.hours);
            timerMinutes.textContent = modifyZeroDate(timer.minutes);
            timerSeconds.textContent = modifyZeroDate(timer.seconds);
            const idSetInterval = setInterval(updateClock, 1000);
            if (timer.timeRemaining <= 0) {
                clearInterval(idSetInterval);
                timerHours.textContent = '00';
                timerMinutes.textContent = '00';
                timerSeconds.textContent = '00';
            }
            console.log(timer.seconds);
        }
        updateClock();
    }
    countTimer('17 nov 2020 03:02:01');
});

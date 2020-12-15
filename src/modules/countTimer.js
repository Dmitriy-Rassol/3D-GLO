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

export default countTimer;
const timer = (timerSelector, daysSelector, hoursSelector, minutesSelector, secondsSelector, deadline) => {
    const timer = document.querySelector(timerSelector),
          daysCounter = timer.querySelector(daysSelector),
          hoursCounter = timer.querySelector(hoursSelector),
          minutesCounter = timer.querySelector(minutesSelector),
          secondsCounter = timer.querySelector(secondsSelector);
    
    let left;

    deadline = new Date(Date.parse(deadline));
    deadline.setHours(0);

    const timeLeft = () => {
        const currentDate = new Date();
        left = Date.parse(deadline) - Date.parse(currentDate);

        const days = Math.floor( (left/(1000*60*60*24)) ),
        seconds = Math.floor( (left/1000) % 60 ),
        minutes = Math.floor( (left/1000/60) % 60 ),
        hours = Math.floor( (left/(1000*60*60) % 24) );

        setTimerCounter(days, hours, minutes, seconds);
    };

    const setTimerCounter = (daysRemain, hoursRemain, minutesRemain, secondsRemain) => {
        daysCounter.textContent = addZero(+daysRemain);
        hoursCounter.textContent = addZero(+hoursRemain);
        minutesCounter.textContent = addZero(+minutesRemain);
        secondsCounter.textContent = addZero(+secondsRemain);
    };

    const addZero = (num) => {
        if (num >= 0 && num < 10) { 
            return '0' + num;
        } else {
            return num;
        }
    };

    const updateClock = () => {
        const time = setInterval(timeLeft, 1000);
        if (left <= 0 ) {
            clearInterval(time);
        }
    };

    timeLeft();
    updateClock();

};

export default timer;
export default class Popup {
    constructor(selector, time, slide) {
        this.selector = document.querySelector(selector);
        this.time = time;
        this.slide = document.querySelector(slide);
    }

    showPopup() {
        if (this.slide.style.display == 'block') {
            console.log('jordan');
            setTimeout(() => {
                this.selector.style.display = 'block';
                this.selector.classList.add('animated', 'fadeInUp');
            }, this.time);
        } else {
            this.selector.style.display = 'none';
            this.selector.classList.remove('animated', 'fadeInUp');
        }
    }
}
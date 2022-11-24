import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor(container, next, prev, activeClass, animate, autoplay) {
        super(container, next, prev, activeClass, animate, autoplay);
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = 0.4;
                slide.querySelector('.card__controls-arrow').style.opacity = 0;
            }
        });

        this.slides[0].classList.add(this.activeClass);
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = 1;
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = 1;
        }
    }

    nextSlide() {
        this.container.appendChild(this.slides[0]);
        this.decorizeSlides();
        if (this.slides[0].tagName == 'BUTTON') {
            this.container.appendChild(this.prev);
            this.prev.classList.remove(this.activeClass);
            this.slides[1].classList.add(this.activeClass);
            this.container.appendChild(this.next);
        }
    }

    autoplayGo() {
		let autoplay = setInterval(() => {
			this.nextSlide();
		}, 5000);

		this.slides[0].parentNode.addEventListener('mouseenter', () => {
			clearInterval(autoplay);
		});

		this.next.addEventListener('mouseenter', () => {
			clearInterval(autoplay);
		});

		this.prev.addEventListener('mouseenter', () => {
			clearInterval(autoplay);
		});
	}

    bindTriggers() {
        this.next.addEventListener('click', () => this.nextSlide());

        this.prev.addEventListener('click', () => {
            let active = this.slides[this.slides.length - 1];
            this.container.insertBefore(active, this.slides[0]);
            this.decorizeSlides();
            if (this.slides[0].tagName == 'BUTTON') {
                this.container.appendChild(this.next);
                this.next.classList.remove(this.activeClass);
                this.slides[this.slides.length - 3].classList.add(this.activeClass);
                this.container.insertBefore(this.slides[this.slides.length - 3], this.slides[0]);
            }
        });
    }

    init() {
        try {
            this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();

        if (this.autoplay) {
            this.autoplayGo();

            this.slides[0].parentNode.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });

            this.next.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });
    
            this.prev.addEventListener('mouseleave', () => {
                this.autoplayGo();
            });
        }
        } catch(e){}
    }
}
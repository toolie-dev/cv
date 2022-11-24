export default class Accordion {
    constructor (triggers) {
        this.btns = document.querySelectorAll(triggers);
    }

    init() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                const sibling = btn.closest('.module__info-show').nextElementSibling;
                sibling.classList.add('animated');
                sibling.style.marginTop = '20px';

                if (!sibling.classList.contains('msg')) {
                    sibling.classList.remove('fadeInDown');
                    sibling.classList.add('fadeOutUp');
                    sibling.addEventListener('webkitAnimationEnd', (e) => {
                        sibling.classList.add('msg');
                    }, {once: true});
  
                } else {
                    sibling.classList.remove('msg', 'fadeOutUp');
                    sibling.classList.add('fadeInDown');
                }
            });
        });
    }
}
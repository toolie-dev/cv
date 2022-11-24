export default class Form {
    constructor(forms) {
        this.forms = document.querySelectorAll(forms);
        this.inputs = document.querySelectorAll('input');
        this.message = {
            loading: 'assets/icons/loading.gif',
            success: 'assets/icons/success.gif',
            failure: 'assets/icons/failure.gif'
        };
        this.path = 'assets/question.php';
    }

    clearInputs() {
        this.inputs.forEach(input => {
            input.value = '';
        });
    }

    checkMailInputs() {
        const txtInputs = document.querySelectorAll('[type="email"]');
    
        txtInputs.forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key.match(/[^a-z 0-9 @ \.]/ig)) {
                    e.preventDefault();
                }
            });
        });
        
        txtInputs.forEach(input => {
            input.addEventListener('input', (e) => {
                if (input.value.match(/[\u0400-\u04ff]{3,30}/ig)) {
                    input.value = '';
                }
            });
        });
    } 

    initMask() {
        let setCursorPosition = (pos, elem) => {
            elem.focus();
    
            if (elem.setSelectionRange) {
                elem.setSelectionRange(pos, pos);
            } else if (elem.createTextRange) {
                let range = elem.createTextRange();
    
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        };
    
        function createMask(event) {
            let matrix = '+1 (___) ___-____',
                i = 0,
                def = matrix.replace(/\D/g, ''),
                val = this.value.replace(/\D/g, '');
    
            if (def.length >= val.length) {
                val = def;
            }
    
            this.value = matrix.replace(/./g, (a) => {
                return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
            });
    
            if (event.type === 'blur') {
                if (this.value.length == 2) {
                    this.value = '';
                }
            } else {
                setCursorPosition(this.value.length, this);
            }
        }
    
        let inputs = document.querySelectorAll('[name="phone"]');
    
        inputs.forEach(input => {
            input.addEventListener('input', createMask);
            input.addEventListener('focus', createMask);
            input.addEventListener('blur', createMask);
        });
    }

    async postData(url, data) {
        let res = await fetch(url, {
            method: 'POST',
            body: data
        });
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.text();
    }

    init() {
        this.initMask();
        this.checkMailInputs();
        this.forms.forEach(item => {
            item.addEventListener('submit', e => {
                e.preventDefault();

                let statusMessage = document.createElement('div');
                statusMessage.style.cssText = `
                    margin-top: 15px;
                    font-size: 18px;
                    color: grey;
                `;
                item.parentNode.appendChild(statusMessage);

                const modal = document.createElement('div');
                modal.classList.add('overlay');
                modal.style.cssText = `
                    display: flex;
                    flex-direction: column;
                `;

                const message = document.createElement('img');
                message.setAttribute('src', this.message.loading);
                message.style.cssText = `
                    display: block;
                    width: 200px;
                    height: 200px;
                `;
                modal.appendChild(message);

                const text = document.createElement('p');
                text.textContent = 'Loading';
                text.style.cssText = `
                    display: block;
                    color: cyan;
                    margin-top: 20px;
                    font-size: 20px;
                `;
                modal.appendChild(text);

                document.body.append(modal);

                const formData = new FormData(item);

                this.postData(this.path, formData)
                    .then(res => {
                        modal.style.cssText = `
                            display: flex;
                            flex-direction: column;
                        `;

                        message.setAttribute('src', this.message.success);
                        message.style.cssText = `
                            display: block;
                            width: 200px;
                            height: 200px;
                        `;

                        text.textContent = 'Success';
                        text.style.cssText = `
                            display: block;
                            color: cyan;
                            margin-top: 20px;
                            font-size: 20px;
                        `;

                    })
                    .catch(() => {
                        modal.style.cssText = `
                            display: flex;
                            flex-direction: column;
                        `;

                        message.setAttribute('src', this.message.failure);
                        message.style.cssText = `
                            display: block;
                            width: 100px;
                            height: 100px;
                        `;

                        text.textContent = 'Something went wrong';
                        text.style.cssText = `
                            display: block;
                            color: red;
                            margin-top: 20px;
                            font-size: 20px;
                        `;

                    })
                    .finally(() => {
                        this.clearInputs();
                        setTimeout(() => {
                            document.querySelector('.overlay img').parentElement.remove();
                        }, 6000);
                    });
            });
        });
    }
}
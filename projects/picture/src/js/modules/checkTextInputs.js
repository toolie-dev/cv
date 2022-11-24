const checkTextInputs = (selector) => {
    const txtInputs = document.querySelectorAll(selector);

    txtInputs.forEach(input => {
        input.addEventListener('keypress', (e) => {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();
            }
        });
    });
    txtInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            if (input.value.match(/[A-z\u00C0-\u00ff]+/ig)) {
                input.value = '';
            }
        });
    });
};  

export default checkTextInputs;
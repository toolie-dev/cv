const calc = (size, material, options, promocode, result) => {
    const sizeBlock = document.querySelector(size),
          materialBlock = document.querySelector(material),
          optionsBlock = document.querySelector(options),
          promocodeBlock = document.querySelector(promocode),
          resultBlock = document.querySelector(result);

        let res = {};
        res.option = 0;

    sizeBlock.addEventListener('change', () => {
        const selected = sizeBlock.selectedIndex;
        const size = +sizeBlock.options[selected].value;
        res.size = size;
        calcResult();
    });

    materialBlock.addEventListener('change', () => {
        const selected = materialBlock.selectedIndex;
        const material = +materialBlock.options[selected].value;
        res.material = material;
        calcResult();
    });

    optionsBlock.addEventListener('change', () => {
        const selected = optionsBlock.selectedIndex;
        const option = +optionsBlock.options[selected].value;
        res.option = option;
        calcResult();

    });

    promocodeBlock.addEventListener('input', () => {
        const promocode = promocodeBlock.value;
        res.promocode = promocode;
        calcResult();
    });

    function calcResult() {
        if (res.size && res.material && res.promocode === 'IWANTPOPART') {
            const result = (res.size * res.material + res.option) * 0.7;
            resultBlock.textContent = result;
            resultBlock.style.cssText = 'font-size: 48px';
        } else if (res.size && res.material) {
            const result = res.size * res.material + res.option;
            resultBlock.textContent = result;
            resultBlock.style.cssText = 'font-size: 48px;';
        }
    }

};

export default calc;
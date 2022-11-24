import {postData} from '../services/requests';
const drop = () => {
    const fileInputs = document.querySelectorAll('[name="upload"]');

    ['dragenter', 'dragleave', 'dragover', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, preventDefaults, false);
        });
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    function highlight(item) {
        item.closest('.file_upload').style.border = '1px solid yellow';
        item.closest('.file_upload').style.borderRadius = '50px';
        item.closest('.file_upload').style.backgroundColor = 'rgb';
    }

    function unhighlight(item) {
        item.closest('.file_upload').style.border = 'none';
        item.closest('.file_upload').style.backgroundColor = '#ededed';
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => highlight(input), false);
        });
    });

    ['dragleave', 'drop'].forEach(eventName => {
        fileInputs.forEach(input => {
            input.addEventListener(eventName, () => unhighlight(input), false);
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('drop', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.previousElementSibling.textContent = name;
            if (input.parentElement.nextSibling.nextSibling == document.querySelector('.main .email')) {
                console.log(input.files);
                postData('assets/server.php', input.files[0]);
                console.log('OK');
            }
        });
    });

    fileInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            input.files = e.dataTransfer.files;
            let dots;
            const arr = input.files[0].name.split('.');

            arr[0].length > 6 ? dots = "..." : dots = '.';
            const name = arr[0].substring(0, 6) + dots + arr[1];
            input.previousElementSibling.previousElementSibling.textContent = name;
            if (input.parentElement.nextSibling.nextSibling == document.querySelector('.main .email')) {
                console.log(input.files);
                postData('assets/server.php', input.files[0]);
            }
        });
    });

};

export default drop;
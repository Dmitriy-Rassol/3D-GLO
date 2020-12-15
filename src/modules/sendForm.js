const sendForm = selectedForm => {
    const loading = document.querySelector('#spinner').content.querySelector('.talign-center');
    const lodaingClone = loading.cloneNode(true);
    const message = {
        error: 'Что-то пошло не так...',
        success: 'Спасибо! Мы скоро с вами свяжемся!'
    };

    const form = document.getElementById(selectedForm);

    const statusMessage = document.createElement('div');
    statusMessage.style.cssText = `font-size: 2rem; color: #fff`;

    const phoneInput = form.querySelector('[type="tel"]');
    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/[^\d+]/g, '');
    });

    const textInput = form.querySelector('[type="text"]');
    textInput.addEventListener('input', () => {
        textInput.value = textInput.value.replace(/[^А-Яа-я\s]/g, '');
    });

    const messageInput = document.querySelector('#form2-message');
    messageInput.addEventListener('input', () => {
        messageInput.value = messageInput.value.replace(/[^А-Яа-я\s]/g, '');
    });


    form.addEventListener('submit', event => {
        event.preventDefault();
        statusMessage.textContent = '';
        form.appendChild(statusMessage);
        form.append(lodaingClone);
        const formData = new FormData(form);
        // let body = {};

        // formData.forEach((val, key) => {
        //     body[key] = val;
        // });
        //
        // Или
        //
        // for (let val of formData.entries()) {
        //     body[val[0]] = val[1];
        // }
        postData(formData)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error('status network is not 200');
                }
                form.removeChild(lodaingClone);
                statusMessage.textContent = message.success;
                form.reset();
            })
            .catch(error => {
                form.removeChild(lodaingClone);
                statusMessage.textContent = message.error;
                console.error(error);
            });
    });
};

const postData = form => fetch('./server.php', {
    method: 'POST',
    body: form
});

export default sendForm;

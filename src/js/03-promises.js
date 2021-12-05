import Notiflix from 'notiflix';

const form = document.querySelector('.form');
form.addEventListener('submit', formSubmit);

function formSubmit(event) {
    event.preventDefault();

    const {
        elements: { delay, step, amount },
    } = event.currentTarget;

    let delayData = Number(delay.value);
    let stepData = Number(step.value);
    let amountData = Number(amount.value);

    let position = 1;
    for (
        let index = 0; index < amountData; index += 1) {
        createPromise(position, delayData)
            .then(({ position, delay }) => {
                Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
            })
            .catch(({ position, delay }) => {
                Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
            });
        position += 1;
        delayData += stepData;
    }
}

function createPromise(position, delay) {
    const shouldResolve = Math.random() > 0.3;

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldResolve) {
                resolve({ position, delay })
                    // Fulfill
            } else {
                reject({ position, delay })
                    // Reject
            }
        }, delay)
    });
}

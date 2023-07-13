import Notiflix from "notiflix";

const refs = {
  form: document.querySelector(`form`),
  firstDealy: document.querySelector(`[name="delay"]`),
  delayStep: document.querySelector(`[name="step"]`),
  amount: document.querySelector(`[name="amount"]`),
  btn : document.querySelector(`button`)
}

refs.form.addEventListener(`submit`, (evt) => {
  evt.preventDefault()

  let delay = Number(refs.firstDealy.value);
  console.log(delay);

  for (let i = 1; i <= refs.amount.value; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      });
  
    delay += Number(refs.delayStep.value)
  }
});

const createPromise = (position, delay) => new Promise((resolve, reject) => {
  
  const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  }, delay)
});

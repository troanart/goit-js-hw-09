import Notiflix from 'notiflix';


const form = document.querySelector('.form');



form.addEventListener('submit', onFormSubmit)


function onFormSubmit(e) {
  e.preventDefault();

  let delay = Number(form.delay.value)
  
  for(let i = 1; i <= form.amount.value; i++) {
    createPromise(i, delay)
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });

    delay += Number(form.step.value);
  
 }
}



function createPromise(position, delay) { 
  const obj = {position, delay}
  const shouldResolve = Math.random() > 0.3;

   return new Promise ((reselve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
       reselve(obj);
      } else {
        reject(obj)
      }
        
    }, delay);
  });

 
  
}




// const promis = new Promise ((reselve, reject) => {
//   const canFulfill = Math.random() > 0.5;

//   setTimeout(() => {
//     if(canFulfill) {
//       reselve('Промис успешно выполниться, с результатом (исполнен, fulfilled)');

//     }

//     reject('Промис віполниться с ошибкой (отклонён, rejected)')
//   }, 2000)
// })

// promis
// .then(onFulfilld)
// .then(x => {
//   console.log(x);
//   return 10;
// })
// .then (y => {
//   console.log(y)
// } )
// .catch(error => console.log(error))
// .finally(() => console.log("Я буду віполнен в любом случае"))


// function onFulfilld (result) {
//   console.log('onFulfilld -> onFulfilld');
//   console.log(`Well done ${result}`)
// }

// function onRejected(error) {
//   console.log('onRejected -> onRejected')
//   console.log(`Oh... its not okay ${error}`)
// }
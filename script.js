const form = document.querySelector('#form');
const input = document.querySelector('#input')
const output = document.querySelector('#output');

let todos = [];


const fetchTodos = () => {
  fetch('https://jsonplaceholder.typicode.com/todos?_limit=10')
    .then(res => res.json())
    .then(data => {
      todos = data;
      listTodos();
    })
}
fetchTodos();


const listTodos = () => {
  output.innerHTML = '';
  todos.forEach(todo => {
    let template = `
    <div class="card p3 my-2">
    <div class="p-3 d-flex justify-content-between align-items-center">
      <h3>${todo.title}</h3>
    </div>
  </div>
  `

  output.insertAdjacentHTML('beforeend', template)
  })
}


const createTodo = (title) => {
  fetch('https://jsonplaceholder.typicode.com/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      title,
      completed: false
    })
  })
.then(res => res.json())
.then(data => {
  console.log(data)

  let newTodo  = {
    ...data,
    id: Date.now().toString()
  }
  console.log(newTodo)
  todos.unshift(newTodo);
  listTodos();
})

}


form.addEventListener('submit', e => {
  e.preventDefault();

  const errors = [];

  validate(form[0]);

  for(let i = 0; i < form.length; i++) {
    errors[i] = validate(form[i])
  }
  if(!errors.includes(false)) {
    createTodo(input.value);
    resetForm();
    // listTodos();

  }  
})



// Validate
const validate = (input) => {
  switch(input.type) {
    case 'text':
      validateText(input);
      if(validateText(input))
        return true
      else
        return false
    default:
      break;
  }
}


const validateText = (input) => {
  if(input.value.trim() === '') {
    setError(input, 'Field cannot be empty');
    return false;
  } else {
    setSuccess(input, '')
    return true;
  }
}


const setSuccess = (input, message) => {
  const inputGroup = input.parentElement;
  inputGroup.classList.remove('error');
  inputGroup.classList.add('success');
  
  const success = inputGroup.querySelector('small');
  success.innerText = message;
 }

const setError = (input, message) => {
  const inputGroup = input.parentElement;
  inputGroup.classList.add('error');
  inputGroup.classList.remove('success');

  const error = inputGroup.querySelector('small');
  error.innerText = message;
}



// Reset form
const resetForm = () => {
  document.querySelectorAll('input').forEach(input => {
    input.value = '';
    input.classList.remove('is-valid');
  })
}

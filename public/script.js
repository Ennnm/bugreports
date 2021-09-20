// ?
// import { getHash } from '../util.mjs';

// const axios = require('axios').default;
const formButton = document.createElement('button');
formButton.innerText = 'Add Bug';

const userRegisBtn = document.createElement('button');
userRegisBtn.innerText = 'Register';

const userLoginBtn = document.createElement('button');
userLoginBtn.innerText = 'Login';

// never make this a form with axios, interferes with it
const createForm = document.createElement('div');
const bugsList = document.createElement('div');

//= =================bugs form=====================
const inputProblem = document.createElement('input');
const inputErrTxt = document.createElement('input');
const inputCommit = document.createElement('input');
const submitBtn = document.createElement('input');
const featuresRadio = document.createElement('div');
const invalidInput = document.createElement('p');

inputProblem.placeholder = 'problem';
inputErrTxt.placeholder = 'error text';
inputCommit.placeholder = 'commit';

inputProblem.name = 'problem';
inputErrTxt.name = 'error';
inputCommit.name = 'commit';
submitBtn.value = 'Submit';
submitBtn.type = 'submit';

invalidInput.innerText = 'Please fill in bug problem and select a feature';
invalidInput.style.color = 'red';
invalidInput.style.display = 'none';

//= ===============registration form================

const loadBugsList = async (bugsDiv) => {
  bugsDiv.innerHTML = '';
  await axios
    .get('/index')
    .then((response) => {
      console.log('sucess in getting index');
      console.log('response :>> ', response.data.bugs);
      const { bugs } = response.data;
      if (bugs.length > 0) { bugs.forEach((bug) => {
        const bugContainer = document.createElement('div');
        bugContainer.innerHTML += `<h3>Problem: ${bug.problem}</h3>
        <p>Error: ${bug.error_text}</p>
        <p>Commit: ${bug.commit}</p>
        <p>Feature: ${bug.feature.name}</p>
        `;

        bugsDiv.appendChild(bugContainer);
      }); } }).catch((e) => console.log('e :>> ', e));
  return bugsDiv;
};
const loadFeatureRadioBtn = async (div) => {
  div.innerHTML = '';
  axios.get('/features')
    .then((response) => {
      console.log('response in :>> ', response);
      const { feat } = response.data;
      console.log('features :>> ', feat);
      feat.forEach((feature) => {
        div.innerHTML += `<div><input type="radio" name="feature" value=${feature.name}><label>${feature.name}</label></div>`;
      });
    });
  return div;
};

const showForm = () => {
  createForm.innerHTML = '';
  createForm.appendChild(invalidInput);
  createForm.appendChild(inputProblem);
  createForm.appendChild(inputErrTxt);
  createForm.appendChild(inputCommit);
  createForm.appendChild(featuresRadio);
  createForm.appendChild(submitBtn);

  loadBugsList(bugsList);
  loadFeatureRadioBtn(featuresRadio);
};
const submitForm = async () => {
  console.log('in submit form');
  const data = {};
  data.problem = inputProblem.value;
  data.error_text = inputErrTxt.value;
  data.commit = inputCommit.value;
  data.feature = document.querySelector('input[name="feature"]:checked') ? document.querySelector('input[name="feature"]:checked').value : null;
  console.log('data :>> ', data);

  if (data.feature === null || data.problem === '')
  {
    console.log('hey inside check');
    invalidInput.style.display = 'block';
    return;
  }

  invalidInput.style.display = 'none';
  axios
    .post('/', data)
    .then((response) => {
    // handle success
      console.log('success');
      console.log(response);
    })
    .catch((error) => {
    // handle error
      console.log('error!===================');
      console.log(error);
      console.log(data);
    });

  // why does document body append and remove child don't work in axios then
  // awaiting axios and loadBugsList doesn't work. TODO: look up on axios await
  // why lag time for loadbuglist
  await loadBugsList(bugsList);
  formButton.style.display = 'inline-block';
  createForm.style.display = 'none';
  userRegisBtn.style.display = 'inline-block';
  userLoginBtn.style.display = 'inline-block';
};
formButton.addEventListener('click', showForm);
submitBtn.addEventListener('click', submitForm);

const submitRegisForm = () => {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const data = {
    username,
    password,
  };
  axios
    .post('/register', data)
    .then((response) => {
      console.log('success in registration! returned userid:', response.data.userId);
    })
    .catch((error) => {
      console.log('error in registration :>> ', error);
    });
  createForm.style.display = 'none';
};

const showRegisForm = () => {
  createForm.style.display = 'block';
  createForm.innerHTML = `
  <input placeholder="username" id="username">
  <input placeholder="password" id="password">
  <button id="submitRegisBtn" >Register</button>`;

  const submitRegisBtn = document.querySelector('#submitRegisBtn');

  submitRegisBtn.addEventListener('click', submitRegisForm);
};
const submitLoginForm = () => {
  const username = document.querySelector('#username').value;
  const password = document.querySelector('#password').value;

  const data = {
    username,
    password,
  };
  axios
    .post('/login', data)
    .then((response) => {
      console.log('response in login :>> ', response);
      if (response.data.error)
      {
        const errorMsg = document.querySelector('#loginError');
        errorMsg.style.display = 'block';
      }
      else {
        console.log('success in logging in! returned userid:', response.data.userId);
        createForm.style.display = 'none';
      }
    })
    .catch((error) => {
      const errorMsg = document.querySelector('#loginError');
      errorMsg.style.display = 'block';
      console.log('error in logging in :>> ', error);
    });
};
const showLoginForm = () => {
  createForm.style.display = 'block';
  createForm.innerHTML = `<p id="loginError">Wrong username or password</p>
  <input placeholder="username" id="username">
  <input placeholder="password" id="password">
  <button id="submitLoginBtn" >Login</button>`;

  const errorMsg = document.querySelector('#loginError');
  errorMsg.style.display = 'none';
  errorMsg.style.color = 'red';
  const submitLoginBtn = document.querySelector('#submitLoginBtn');

  submitLoginBtn.addEventListener('click', submitLoginForm);
};
userRegisBtn.addEventListener('click', showRegisForm);
userLoginBtn.addEventListener('click', showLoginForm);

document.body.appendChild(formButton);
document.body.appendChild(userRegisBtn);
document.body.appendChild(userLoginBtn);

document.body.appendChild(createForm);
document.body.appendChild(bugsList);

createForm.style.display = 'none';
loadBugsList(bugsList);

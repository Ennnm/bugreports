const component = () => {
  // make a container
  const div = document.createElement('div');

  // display element
  const span = document.createElement('span');

  // input
  const input = document.createElement('input');

  // on change, display in the span
  input.addEventListener('change', () => {
    span.innerText = input.value;
  });
  console.log('hey');
  div.appendChild(input);
  div.appendChild(span);

  return div;
};

document.body.appendChild(component());

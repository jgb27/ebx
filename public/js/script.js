const input = document.getElementById("input");
const history = document.getElementById("history");

// send data to server when press enter
let nQuestion;
input.addEventListener('keyup', (e) => {
  
  // if press enter and alt
  if (e.key === 'Enter' && e.ctrlKey) {
    var sQuestion = `Human: ${input.value}`;
    history.innerHTML += `<p class="human">${input.value}</p>`;
    input.value = '';
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ data: sQuestion })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        history.innerHTML += `<p class="ai">${data.ai}</p>`;
      })
  }
})

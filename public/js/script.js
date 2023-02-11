const input = document.getElementById("input");
const history = document.getElementById("history");

// send data to server when press enter
input.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const value = e.target.value;
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ value })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        history.innerHTML += `<p class="human">${data.body.value}</p>`;
      })
  }
})
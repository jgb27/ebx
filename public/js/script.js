const input = document.getElementById("input");
const history = document.getElementById("history");

const humanText = document.querySelectorAll(".human");
const aiText = document.querySelectorAll(".ai");

function makeQuestion() {
  let question = "";
  for (let i = 0; i < humanText.length; i++) {
    question += `Human: ${humanText[i].innerText}\n`;
    if (aiText[i]) question += `AI: ${aiText[i].innerText}\n`;
  }
  if (input.value) question += `Human: ${input.value}\n`;
  return question;
}


// send data to server when press enter
input.addEventListener('keyup', (e) => {
  var sQuestion = makeQuestion();

  if (e.key === 'Enter') {
    const value = e.target.value;
    fetch('/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "model": "text-davinci-003",
        "prompt": sQuestion,
        "temperature": 0.9,
        "max_tokens": 150,
        "top_p": 1,
        "frequency_penalty": 0,
        "presence_penalty": 0.6,
        "stop": [" Human:", " AI:"]
      })
    }).then(res => res.json())
      .then(data => {
        console.log(data);
        history.innerHTML += `<p class="human">${data.body}</p>`;
      })
  }
})

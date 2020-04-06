
// Page Event Listener
window.addEventListener('load', generatePassPhrase);


// Global Elements
const pass = document.getElementById('password');

// Document Event Listeners
document.querySelector('.passSize').addEventListener('change', (e) =>{
  generatePassPhrase();
});

// Copy and Paste event
document.querySelector('#copyButton').addEventListener('click', copyToClipboard);

// Refresh Event
document.querySelector('#refreshButton').addEventListener('click', generatePassPhrase);

// Uppercase event
document.querySelector(".uppercase-check").addEventListener('change', upperCase);

// Number event
document.querySelector(".numbers-check").addEventListener('change', numbers);

// Special Chars event
document.querySelector(".specialchars-check").addEventListener('change', specialchars);

// Generate PassPhrase from API
async function generatePassPhrase(){
  const amount = document.querySelector('.passSize').value;

  const words = await fetch(`https://random-word-api.herokuapp.com/word?number=${amount}`);

  const wordsResponse = await words.json();
  
  let output = '';
  wordsResponse.forEach((word) => {
    output += `${word} `;
  });


  pass.value = output.trim();

  document.querySelector(".uppercase-check").checked = false;
  document.querySelector(".numbers-check").checked = false;
  document.querySelector(".specialchars-check").checked = false;
  
}


function copyToClipboard(){

  navigator.clipboard.writeText(pass.value).then(() => {
    console.log("successful copy");
  }, () => {
    console.log("failed copy");
  });


  $('#copyButton').tooltip('show'); 
  

  setTimeout(() => {
    $('#copyButton').tooltip('hide');
  }, 1000);
}

// add random uppercasing to pass phrase
function upperCase() {
  
  const upperCase = document.querySelector(".uppercase-check");
  if (upperCase.checked) {

    // Create array of each word
    const splitWords = pass.value.split(" ");

    let word = "";
    let output = [];
    splitWords.forEach(item => {
      // create array of chars for each word.
      word = item.split("");      

      let updated = "";
      for (let j=0; j < word.length; j++){
        // console.log(word[j]);
        let x = Math.floor(Math.random() * 5);
        if (x === 0){
          updated += word[j].toUpperCase();
        }
        else {
          updated += word[j];
        }
      }
      
      output.push(updated)

    });

    pass.value = output.join(" ");

    
  } else {
    // console.log('Unchecked');
    pass.value = pass.value.toLowerCase();
  }
}

function numbers() {
  
  const numbers = document.querySelector(".numbers-check");
  if (numbers.checked) {

    sessionStorage.setItem('oldInput_num', pass.value);
    const splitWords = pass.value.split(" ");
    
    // iterate through words
    let output = [];

    splitWords.forEach(item => {
      let word = "";

      word = item.split("");

      let updated = "";
      // iterate through chars of each word
      for (let i=0;i < word.length; i++){
        
        let x = Math.floor(Math.random() *5);

        if (x === 0){
          // select random char to replace with number
          word[i] = Math.floor(Math.random()*10);
          updated += word[i];
        } else {
          updated += word[i];
        }
      }

      output.push(updated);
      

    });

    pass.value = output.join(" ");

  } else {
    const oldValue = sessionStorage.getItem('oldInput_num');
    pass.value = oldValue;
  }


}

function specialchars() {

  const spec_chars = document.querySelector(".specialchars-check");
  if (spec_chars.checked) {

    sessionStorage.setItem('oldInput_spec', pass.value);
    const splitWords = pass.value.split(" ");
    
    // iterate through words
    let output = [];

    splitWords.forEach(item => {
      let word = "";

      word = item.split("");

      let updated = "";
      // iterate through chars of each word
      for (let i=0;i < word.length; i++){
        
        let x = Math.floor(Math.random() *5);

        if (x === 0){
          // select random char to replace with number
          word[i] = randomSpecialChar();
          updated += word[i];
        } else {
          updated += word[i];
        }
      }

      output.push(updated);
    });

    pass.value = output.join(" ");

  } else {
    const oldValue = sessionStorage.getItem('oldInput_spec');
    pass.value = oldValue;
  }
}

function randomSpecialChar(){
  let specialchars = ['!', '$', '@'];
  let y = Math.floor(Math.random()* 3);
  return specialchars[y];
}

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

// Spaces event
document.querySelector("#first").addEventListener('change', () => {
  const separator = " ";
  changeConnector(separator);
});

// Underscores event
document.querySelector("#second").addEventListener('change', () => {
  const separator = "_";
  changeConnector(separator);
});

// Dashes event
document.querySelector("#third").addEventListener('change', () => {
  const separator = "-";
  changeConnector(separator);
});


// Generate PassPhrase from API
async function generatePassPhrase(){
  const amount = document.querySelector('.passSize').value;
  
  //  const words = await fetch(`http://localhost:3000/?count=${amount}`);   
  const words = await fetch(`https://random-word-api.herokuapp.com/word?number=${amount}`);

  const wordsResponse = await words.json();
  
  let output = '';
  wordsResponse.forEach((word) => {
    output += `${word} `;
  });

  output = output.trim();

  const underExist = document.querySelector('#second');
  const dashesExist = document.querySelector('#third');
  if(underExist.checked){
    console.log('under checked');
    output = output.split(" ");
    output = output.join("_");
    sessionStorage.setItem("oldSeparator", "_");

  } else if(dashesExist.checked){
    console.log('dashes');
    output = output.split(" ");
    output = output.join("-");
    sessionStorage.setItem("oldSeparator", "-");
  } else {
    sessionStorage.setItem("oldSeparator", " ");
  }

  pass.value = output;

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

function changeConnector(separator){
//  console.log("inside change connector");
  const spacesExist = document.querySelector('#first');
  const undersExist = document.querySelector('#second');
  const dashesExist = document.querySelector('#third');

  // get input
  let input = pass.value;
  let oldSep = sessionStorage.getItem('oldSeparator');

  // split with current connector
  if (spacesExist.checked){
    input = input.split(oldSep);

  } else if (undersExist.checked){
    input = input.split(oldSep);

  } else if (dashesExist.checked){
    input = input.split(oldSep);

  }

  // join with updated connector
  input = input.join(separator);

  // set to pass value
  pass.value = input;
  

  sessionStorage.setItem('oldSeparator', separator);

}
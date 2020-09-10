# Word generator
To run this use the following commands:

        npm install
        node ./app.js

Then navigate to http://localhost:3000/ . You should see a JSON array containing a single word.

Uncomment line 52 and comment out line 53 of `Passphrase-Generator/app.js`

    const words = await fetch(`http://localhost:3000/?count=${amount}`);   
      //const words = await fetch(`https://random-word-api.herokuapp.com/word?number=${amount}`);

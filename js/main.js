// select the button using ID
var button = document.querySelector('#translateBtn');
var userInput = document.querySelector('#userInput');
var resultInput = document.querySelector('#result');
var loadingDiv = document.querySelector('#loading');

//Array to display save into localStorage and display into DOM by id = translationHistory
let history = []; 
var printing = '';
var inputIsValid = false;

function localHistory(input, output) {
    //Check if localStorage is empty, if true, then set printing to NULL, cause it need to be mepty to display
    //  correct translation history
    //Add userInput into array of string and save it to localStorage
    history.push({input: input, output: output});
    console.log(history);
    //Display local storage item by item into printing string, use <br> after one element to display text 
    //  into div 

    localStorage.setItem('history', JSON.stringify(this.history));
}

function displayStorage(history) {
    var result = "";
    ///history.forEach(function (item){
     //   result += item.input + " -> " + item.output + "<br>";
   // });
    //From newer to oldest history 
    for(var i = history.length - 1; i >= 0; i--) {
        result += history[i].input + " -> " + history[i].output + "<br>";
    }

    document.getElementById("translationHistory").innerHTML = result;
}

//Checking function if input is not empty or string
function checkInput(input) {
    if(typeof input === 'string' && input.length != 0) {
        console.log('Input is string and is not null. Test passed.');
        return inputIsValid = true;
    }
    else {
        alert('Please, enter text to translation.');
    }
}

button.onclick = function () {
    //Check if input is string and valid
    checkInput(userInput.value);

    if(inputIsValid === true) {
        // show the loading dialog
        loadingDiv.style.display = 'block';
        // disable translate button
        button.setAttribute('disabled','disabled');

        console.log(userInput.value + ' <- text to translate...');
        var inputText = userInput.value;

        // test - write into DOM
        resultInput.value = inputText;

        // REST API url endpoint
        var url = 'https://api.mymemory.translated.net/get?q=' + inputText + '&langpair=cs|en';

        // create the GET request against API to obtain JSON result
        fetch(url)
        .then(function(response) {
            // server returns the response, parse it to JSON
            return response.json();
        })
        .then(function(myJson) {
            console.log(myJson);
            // get translation string from JSON, put it in result input
            resultInput.value = myJson.responseData.translatedText;

            // hide the loading dialog
            loadingDiv.style.display = 'none';
            // enable translate button
            button.removeAttribute('disabled');

            
            localHistory(inputText, resultInput.value);

            if(localStorage.getItem('history')) {
                this.history = JSON.parse(localStorage.getItem('history'));
            }

            displayStorage(history);
        });
    }   
}
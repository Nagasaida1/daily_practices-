const button = document.querySelector('button');
const textarea = document.querySelector('textarea');
const root =document.querySelector('#root');

textarea.value = localStorage.getItem('savedText') || '';

let recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();

recognition.lang = 'en-In'; // English (United States)


recognition.continuous = true;

recognition.onresult = function(event) {
    const last = event.results.length -1;
    const text = event.results[last][0].transcript;

   // Function to animate text printing
    function typeText(text, index =0) {
        if (index < text.length) {
            textarea.value += text[index]; // Add characters one by one
            setTimeout(() => typeText(text, index +1), 50); // Delay for the print effect
        } else {
            textarea.value += '\n'; // Add a new line after the text is complete
            localStorage.setItem('savedText', textarea.value); // Save the text in local storage
        } 
    }
    
    typeText(text); // Call the function to print the text
}

recognition.onerror = function(event) {
    root.textContent = 'Please allow me to use the microphone!';
    console.error('Microphone access is denied: '+ event.error);
}

button.addEventListener('click', function() {
    if (button.classList.contains('animation')) {
        recognition.stop();
        button.classList.remove('animation');
    } else{
        recognition.start();
        button.classList.add('animation');
    }
});

textarea.addEventListener('input', function() {
    localStorage.setItem('savedText', textarea.value);
});
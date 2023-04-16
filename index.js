"use strict";
// Import stylesheets
//import './style.css';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// get FORM from element html for reference and preform manipulation
const form = document.querySelector('#defineform');
const list = document.querySelector('.list-unstyled');
const header = document.querySelector('h1');
const phoneticLine = document.querySelector('#phonetic');
form.onsubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
    event.preventDefault();
    const formData = new FormData(form);
    const text = formData.get('defineword'); // get the word user input
    try {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${text}`);
        const data = yield response.json();
        header.innerText = text;
        phoneticLine.innerText = data[0].phonetic;
        list.innerHTML = '';
        data[0].meanings.forEach((element) => {
            const li = document.createElement('li');
            li.innerText = `${element.partOfSpeech} - ${element.definitions[0].definition}`;
            list.appendChild(li);
        });
    }
    catch (err) {
        console.log(err);
    }
    return false; // prevent reload
});
//# sourceMappingURL=index.js.map
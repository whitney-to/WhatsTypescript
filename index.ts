// Import stylesheets
//import './style.css';

interface Data {
  word: string,
  phonetic: string,
  phonetics: Phonetic[],
  origin: string,
  meanings: Meaning[]
}

interface Phonetic {
  text: string,
  audio: string
}

interface Meaning {
  partOfSpeech: string,
  definitions: Definition[]
}

interface Definition {
  definition: string,
  example: string,
  synonyms: string[],
  antonyms: string[]
}



// get FORM from element html for reference and preform manipulation
const form: HTMLFormElement = document.querySelector('#defineform')!;
const list: HTMLUListElement = document.querySelector('.list-unstyled')!;
const header: HTMLHeadingElement = document.querySelector('h1')!;
const phoneticLine : HTMLElement = document.querySelector('#phonetic')!;

form.onsubmit = async (event: Event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const text = formData.get('defineword') as string; // get the word user input

  try{
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${text}`);
    const data = await response.json();
  
    header.innerText = text;
    phoneticLine.innerText = data[0].phonetic;

    list.innerHTML = '';
  
    data[0].meanings.forEach((element: any) => {
      const li = document.createElement('li');
      li.innerText = `${element.partOfSpeech} - ${element.definitions[0].definition}`;
      list.appendChild(li);
    });
  } catch(err){
    console.log(err);
  }

  return false; // prevent reload
};

import { useEffect, useState } from 'react';

// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Dummy.scss';
import '../styles/Letters.scss';
import '../styles/Form.scss';
import '../styles/Header.scss';
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';


function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  const handleChange = (ev) => {
    let re = /^[a-zA-ZñÑá-úÁ-Ú´]$/; //add regular pattern 
    if (re.test(ev.target.value) || ev.target.value === '') {
      handleLastLetter(ev.target.value);
    }
  };

  const handleKeyDown = (ev) => {
    // Sabrías decir para qué es esta línea
    ev.target.setSelectionRange(0, 1);
  };


  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const renderErrorLetters = () => {
    const errorLetters = userLetters.filter(
      (letter) =>
        word.toLocaleLowerCase().includes(letter.toLocaleLowerCase()) === false
    );
    return errorLetters.map((letter, index) => {
      return (
        <li key={index} className='letter'>
          {letter}
        </li>
      );
    });
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };




  return (
    <div className='page'>
      <Header text="Juego del ahorcado" classHeader="header__title" />
      <main className='main'>
        <section>
          <SolutionLetters userLetters={userLetters} word={word}></SolutionLetters>
          <ErrorLetters userLetters={userLetters} word={word} />
          <Form handleSubmit={handleSubmit} handleKeyDown={handleKeyDown} handleChange={handleChange} lastLetter={lastLetter} />
        </section>
        <Dummy numberOfErrors={getNumberOfErrors()}></Dummy>
      </main>
    </div>
  );
}

export default App;

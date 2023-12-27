import React, { useEffect, useState } from 'react';
import ListaDeJogos from '../components/ListaDeJogos.jsx';
import jogos from '../data/jogos.js';

const Home = () => {
  const [numberQty, setNumberQty] = useState(6);
  const [numerosGanhadores, setNumerosGanhadores] = useState([]);
  const [inputValues, setInputValues] = useState([]);

  useEffect(() => {
    setNumerosGanhadores(inputValues.filter(Boolean).map(Number));
  }, [inputValues]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };

  return (
    <>
      <div>
        {/* <input
          type='number'
          placeholder='Quantidade de numeros'
          value={numberQty}
          min={0}
          onChange={(e) => {
            setNumberQty(e.target.value);
            setInputValues([]);
          }}
        /> */}
      </div>
      <div>
        {Array.from({ length: numberQty }, (_, index) => (
          <input
            style={{
              width: 180,
              height: 200,
              fontSize: 150,
              textAlign: 'center',
            }}
            key={index}
            type='text'
            placeholder={index + 1}
            value={inputValues[index] || ''}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {jogos.map((jogo, index) => (
          <ListaDeJogos
            key={index}
            jogo={jogo}
            numerosGanhadores={numerosGanhadores}
          />
        ))}
      </div>
    </>
  );
};

export default Home;

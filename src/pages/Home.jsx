import React, { useEffect, useState } from 'react';
import ListaDeJogos from '../components/ListaDeJogos.jsx';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const localJogos = JSON.parse(localStorage.getItem('jogos'));

  const [numberQty, setNumberQty] = useState();
  const [numerosGanhadores, setNumerosGanhadores] = useState([]);
  const [inputValues, setInputValues] = useState([]);
  const [ultimaMega, setUltimaMega] = useState([]);
  const [usandoUltimaMega, setUsandoUltimaMega] = useState(false);
  const [jogos, setJogos] = useState(localJogos);

  useEffect(() => {
    localStorage.setItem('jogos', JSON.stringify(jogos));
  }, [jogos]);
  useEffect(() => {
    setNumerosGanhadores(inputValues.filter(Boolean).map(Number));
  }, [inputValues]);

  const handleInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };
  const handleAdicionarJogo = () => {
    if (jogos?.length > 0) {
      setJogos([
        ...jogos,
        {
          nome: 'Novo jogo',
          id: uuidv4(),
          cartelas: [],
        },
      ]);
    } else {
      setJogos([
        {
          nome: 'Novo jogo',
          id: uuidv4(),
          cartelas: [],
        },
      ]);
    }
  };
  const handleAdicionarCartela = (jogo) => {
    const newJogos = jogos.map((jog) => {
      if (jog.id == jogo.id) {
        const antigasCartelas = jogo.cartelas;
        return {
          ...jogo,
          cartelas: [
            ...antigasCartelas,
            {
              id: uuidv4(),
              numerosSelecionados: [],
              nome: 'Nova cartela',
              maxNumber: 60,
              qtdGanhar: 6,
            },
          ],
        };
      } else {
        return jog;
      }
    });
    setJogos(newJogos);
  };

  const handleAtivarUltimaMega = (e) => {
    if (e.target.checked) {
      setUsandoUltimaMega(true);
      setNumberQty(6);
      setInputValues(ultimaMega.dezenas);
    } else {
      setUsandoUltimaMega(false);
      setNumberQty(0);
      setInputValues([]);
    }
  };

  const handleMudarNumeroCartela = (cartela, numero, jogo) => {
    if (cartela.numerosSelecionados.includes(numero)) {
      const newNumeros = cartela.numerosSelecionados.filter(
        (numer) => numero !== numer
      );

      const newJogos = jogos.map((jog) => {
        if (jog.id == jogo.id) {
          const newCartelas = jog.cartelas.map((carte) => {
            if (carte.id == cartela.id) {
              return {
                ...carte,
                numerosSelecionados: newNumeros,
              };
            } else {
              return carte;
            }
          });
          return {
            ...jog,
            cartelas: newCartelas,
          };
        } else {
          return jog;
        }
      });
      setJogos(newJogos);
    } else {
      const numeros = cartela.numerosSelecionados;
      numeros.push(numero);

      const newJogos = jogos.map((jog) => {
        if (jog.id == jogo.id) {
          const newCartelas = jog.cartelas.map((carte) => {
            if (carte.id == cartela.id) {
              return {
                ...carte,
                numerosSelecionados: numeros,
              };
            } else {
              return carte;
            }
          });
          return {
            ...jog,
            cartelas: newCartelas,
          };
        } else {
          return jog;
        }
      });

      setJogos(newJogos);
    }
  };

  const handleMudarNomeCartela = (nome, cartela, jogo) => {
    const newJogos = jogos.map((jog) => {
      if (jog.id == jogo.id) {
        const newNome = jog.cartelas.map((carte) => {
          if (carte.id == cartela.id) {
            return {
              ...carte,
              nome,
            };
          } else {
            return carte;
          }
        });
        return {
          ...jog,
          cartelas: newNome,
        };
      } else {
        return jog;
      }
    });
    setJogos(newJogos);
  };

  const handleMudarNomeJogo = (nome, jogo) => {
    const newJogos = jogos.map((jog) => {
      if (jog.id == jogo.id) {
        return {
          ...jog,
          nome,
        };
      } else {
        return jog;
      }
    });
    setJogos(newJogos);
  };

  useEffect(() => {
    setJogos(localJogos);
    axios
      .get(
        'https://apiloterias.com.br/app/v2/resultado?loteria=megasena&token=kJdfLjd38Jai2ek'
      )
      .then(function (resposta) {
        setUltimaMega(resposta.data);
      });
  }, []);

  return (
    <>
      <h2>Cartela checker</h2>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <fieldset style={{ border: 'none', padding: 0 }}>
            <input
              type='checkbox'
              checked={usandoUltimaMega}
              onChange={(e) => {
                handleAtivarUltimaMega(e);
              }}
              id='mega'
            />
            <label for='mega'>Usar ultimo jogo da mega-sena</label>
          </fieldset>

          <h3>Insira a quantidade de numeros</h3>
          <input
            disabled={usandoUltimaMega}
            value={numberQty}
            style={{
              width: 50,
              height: 50,
              fontSize: 20,
              textAlign: 'center',
            }}
            type='text'
            name=''
            id=''
            onChange={(e) => {
              setNumberQty(e.target.value);
            }}
          />
        </div>
        {numberQty > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <h3>Insira os numeros</h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}
            >
              {Array.from({ length: numberQty }, (_, index) => (
                <input
                  disabled={usandoUltimaMega}
                  style={{
                    width: 50,
                    height: 50,
                    fontSize: 20,
                    textAlign: 'center',
                  }}
                  key={index}
                  type='number'
                  min={1}
                  max={100}
                  placeholder={index + 1}
                  value={inputValues[index] || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  onBlur={(e) => {
                    if (e.target.value <= 0) {
                      handleInputChange(index, ' ');
                    }
                    if (e.target.value > 100) {
                      handleInputChange(index, ' ');
                    }
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {jogos?.map((jogo, index) => (
          <ListaDeJogos
            key={index}
            jogo={jogo}
            numerosGanhadores={numerosGanhadores}
            handleAdicionarCartela={handleAdicionarCartela}
            handleMudarNumeroCartela={handleMudarNumeroCartela}
            handleMudarNomeCartela={handleMudarNomeCartela}
            handleMudarNomeJogo={handleMudarNomeJogo}
          />
        ))}
        <button
          style={{ marginTop: 32 }}
          onClick={() => {
            handleAdicionarJogo();
          }}
        >
          Criar jogo
        </button>
      </div>
    </>
  );
};

export default Home;

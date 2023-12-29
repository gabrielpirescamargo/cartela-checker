import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import './cartela.css';
const Cartela = ({
  cartela,
  numerosGanhadores,
  handleMudarNumeroCartela,
  jogo,
  handleMudarNomeCartela,
}) => {
  const [editando, setEditando] = useState(false);
  const dados = Array.from(
    { length: cartela.maxNumber },
    (_, index) => index + 1
  );

  const linhas = [];
  for (let i = 0; i < dados.length; i += 10) {
    const linha = dados.slice(i, i + 10);
    linhas.push(linha);
  }

  const numerosCorretos = cartela.numerosSelecionados.filter((num) => {
    return numerosGanhadores?.includes(num);
  });

  useEffect(() => {
    if (numerosCorretos.length >= cartela.qtdGanhar) {
      alert('Parabens, voce ganhou usando a cartela: ' + cartela.nome);
    }
  }, [numerosCorretos]);

  return (
    <div style={{ background: '#373737', width: 400 }}>
      <div
        style={{
          background: '#0D926A',
          width: '100%',
          height: 60,
        }}
      >
        {editando ? (
          <h2
            style={{
              margin: 0,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
              paddingLeft: 16,
              paddingRight: 16,
              fontSize: 30,
            }}
          >
            <input
              maxLength={16}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '30px',
                fontWeight: 'bold',
              }}
              type='text'
              value={cartela.nome}
              onChange={(e) =>
                handleMudarNomeCartela(e.target.value, cartela, jogo)
              }
            />
            <FontAwesomeIcon
              style={{ cursor: 'pointer' }}
              icon={faCheck}
              onClick={() => {
                setEditando(false);
              }}
            />
          </h2>
        ) : (
          <h2
            style={{
              margin: 0,
              fontSize: 30,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: '100%',
              paddingLeft: 16,
              paddingRight: 16,
            }}
          >
            {cartela.nome}
            <FontAwesomeIcon
              style={{ cursor: 'pointer' }}
              icon={faPenToSquare}
              onClick={() => {
                setEditando(true);
              }}
            />
          </h2>
        )}
      </div>

      <div style={{ padding: 50, paddingBottom: 10, paddingTop: 20 }}>
        <table>
          <tbody>
            {linhas.map((linha, index) => (
              <tr key={index}>
                {linha.map((item) => {
                  const isSelected =
                    cartela?.numerosSelecionados?.includes(item);

                  const isGanhador = numerosGanhadores?.includes(item);
                  return (
                    <td
                      onClick={(e) => {
                        handleMudarNumeroCartela(cartela, item, jogo);
                      }}
                      style={
                        isGanhador
                          ? {
                              border: '1px solid red',
                              borderRadius: '50%',
                              background: 'red',
                              cursor: 'pointer',
                              width: 30,
                              color: 'white',
                              userSelect: 'none',
                              textAlign: 'center',
                            }
                          : isSelected
                          ? {
                              border: '1px solid #0D926A',
                              background: '#0D926A',
                              borderRadius: '50%',
                              cursor: 'pointer',
                              width: 30,

                              userSelect: 'none',
                              textAlign: 'center',
                            }
                          : {
                              width: 30,

                              textAlign: 'center',
                              color: 'white',
                              borderRadius: '50%',
                              border: '1px solid transparent',
                              cursor: 'pointer',
                              userSelect: 'none',
                            }
                      }
                      key={item}
                    >
                      {item}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          margin: 20,

          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          boxSizing: 'border-box',
        }}
      >
        <span
          style={{
            color: 'white',
            background: '#0D926A',

            padding: 8,
            fontSize: 14,
            boxSizing: 'border-box',
            borderRadius: 20,
          }}
        >
          ({numerosCorretos?.length} corretos)
          {numerosCorretos &&
            numerosCorretos?.map((num) => {
              return ` - ${num}`;
            })}
        </span>
      </div>
    </div>
  );
};

export default Cartela;

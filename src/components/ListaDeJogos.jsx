import { faAdd, faCheck } from '@fortawesome/free-solid-svg-icons';
import Cartela from './Cartela';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { useState } from 'react';

const ListaDeJogos = ({
  jogo,
  numerosGanhadores,
  handleAdicionarCartela,
  handleMudarNumeroCartela,
  handleMudarNomeCartela,
  handleMudarNomeJogo,
}) => {
  const [editando, setEditando] = useState(false);
  return (
    <div
      style={{
        marginTop: 50,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {editando ? (
        <h2
          style={{
            margin: 0,
            display: 'flex',
            marginBottom: 20,
            alignItems: 'center',
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
              width: 'min-content',
            }}
            type='text'
            value={jogo.nome}
            onChange={(e) => handleMudarNomeJogo(e.target.value, jogo)}
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
            marginBottom: 20,
            alignItems: 'center',
          }}
        >
          {jogo.nome}
          <FontAwesomeIcon
            style={{ cursor: 'pointer', marginLeft: 16 }}
            icon={faPenToSquare}
            onClick={() => {
              setEditando(true);
            }}
          />
        </h2>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {jogo.cartelas.map((cartela) => {
          return (
            <Cartela
              cartela={cartela}
              numerosGanhadores={numerosGanhadores}
              handleMudarNumeroCartela={handleMudarNumeroCartela}
              jogo={jogo}
              handleMudarNomeCartela={handleMudarNomeCartela}
            />
          );
        })}
        <button
          style={{
            background: '#0D926A',
            width: 400,
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 32,
            flexDirection: 'column',
          }}
          onClick={() => {
            handleAdicionarCartela(jogo);
          }}
        >
          Adicionar cartela
          <FontAwesomeIcon
            size='xl'
            style={{ cursor: 'pointer' }}
            icon={faAdd}
          />
        </button>
      </div>
    </div>
  );
};

export default ListaDeJogos;

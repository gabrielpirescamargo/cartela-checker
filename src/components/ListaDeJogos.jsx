import Cartela from './Cartela';

const ListaDeJogos = ({ jogo, numerosGanhadores }) => {
  return (
    <div>
      <h4>{jogo.nome}</h4>
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
            <Cartela cartela={cartela} numerosGanhadores={numerosGanhadores} />
          );
        })}
      </div>
    </div>
  );
};

export default ListaDeJogos;

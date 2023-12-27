import { useEffect } from 'react';

const Cartela = ({ cartela, numerosGanhadores }) => {
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
    <div style={{ background: '#FFF0B7', width: 500, height: '100%' }}>
      <div
        style={{
          background: '#018B76',
          width: '100%',
          height: 60,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h2>{cartela.nome}</h2>
      </div>

      <div style={{ padding: 50, paddingTop: 20 }}>
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
                      style={
                        isGanhador
                          ? {
                              border: '1px 1px 0px 0px solid green',
                              background: 'green',

                              width: 40,
                              height: 20,
                              textAlign: 'center',
                            }
                          : isSelected
                          ? {
                              border: '1px 1px 0px 0px solid #D24840',
                              background: '#D24840',

                              width: 40,
                              height: 20,
                              textAlign: 'center',
                            }
                          : {
                              width: 40,
                              height: 20,
                              textAlign: 'center',
                              color: '#D24840',

                              borderLeft: '1px solid #D24840',
                              borderRight: '1px solid #D24840',
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

      <div>
        <span style={{ color: 'black' }}>
          Numeros corretos: ({numerosCorretos?.length} corretos)
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

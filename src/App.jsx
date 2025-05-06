import { useState, useEffect } from 'react';
import { ApiCEP } from './API/api';
import './App.css';

function App() {
  const [cep, setCEP] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [error, setError] = useState(false);
  const [bairro, setBairro] = useState("");
  const [rua, setRua] = useState("");
  const [estado, setEstado] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [ibge, setIbge] = useState("");
  const [ddd, setDdd] = useState("");

  function erroCEP() {
    return <p style={{color:'red'}}>Este CEP não foi encontrado!</p>;
  }

  useEffect(() => {
    const sanitizedCep = cep.replace(/\D/g, "");
  
    if (sanitizedCep.length !== 8) return;
    console.log(sanitizedCep)
  
    ApiCEP.get(`/ws/${sanitizedCep}/json/`)
      .then(res => {
        const data = res.data;
  
        if (data.erro) {
          console.warn("CEP não encontrado");
          setError(true);
          return;
        }
  
        setRua(data.logradouro);
        setBairro(data.bairro);
        setEstado(data.uf );
        setLocalidade(data.localidade || data.cidade);
        setIbge(data.ibge);
        setDdd(data.ddd);
        setError(false);
  
        const address = `${data.logradouro ? data.logradouro + ', ' : ''}${data.localidade}, ${data.uf}`;
        console.log('Endereço completo:', address);
      })
      .catch((err) => {
        console.warn("Erro ao buscar o CEP", err);
        setError(true);
      });
  }, [cep]);  

  return (
    <section>
      <h1>API CEP - Trabalho em dupla</h1>
      <h4>JAQUELINE & FABIO</h4>
      <div className='search-conteiner'>
        <input
          type="text"
          onChange={(e) => setCEP(e.target.value)}
          value={cep}
          placeholder='Digite o CEP'
        />
      </div>
      <div className='info-conteiner'>
        {error ? erroCEP() :
          <div>
            <p>RUA: {rua}</p>
            <p>BAIRRO: {bairro}</p>
            <p>ESTADO: {estado}</p>
            <p>LOCALIDADE: {localidade}</p>
            <p>IBGE: {ibge}</p>
            <p>DDD: {ddd}</p>
          </div>
        }
      </div>
    </section>
  );
}

export default App;

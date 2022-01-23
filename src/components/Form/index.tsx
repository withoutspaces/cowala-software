import React, { useState, useEffect } from "react";

import api from "../../services/client";
import InputMask from 'react-input-mask'

import "./style.css";

interface IuserData {
  name?: string
  phone?: string
  occupation?: string
  ip?: string
}
const Form = () => {
  const [userIp, setUserIp] = useState('');
  const [inputs, setInputs] = useState<IuserData>({});
  const [recoveredData, setRecoveredData] = useState<IuserData>({});
  
  useEffect(() => {
    recoverUserData()
  },[])

  function recoverUserData() {
    let recoverInputs = localStorage.getItem('inputs');
    let ip = localStorage.getItem('ip')
    let recovered = recoverInputs !== null ? JSON.parse(recoverInputs) : {};
    if (ip) setUserIp(ip)
    setRecoveredData(recovered);
    setInputs(recoveredData);
    console.log(recoveredData)
  }

  function onChange(event:any) {
    const { name, value } = event.target

    setInputs({...inputs, [name]: value})
  }


  const onSubmit = (event:any) => {
    event.preventDefault();

    localStorage.setItem('inputs', JSON.stringify(inputs))
    localStorage.setItem('ip', userIp)
    alert(JSON.stringify(inputs));
  }


  function handleClearInputs() {
    setRecoveredData({});
    setInputs({});
    setUserIp('');
    localStorage.clear();
  }


  function getUserIp(){
    api
    .get('/ip')
    .then((response) => {
        setUserIp(response.data);
      })
    .catch((err) => {
        alert('Aconteceu um erro: ' + err);
    })
  }


  return (
    <div className="form-container">

      <div className="form-info">

        <form onSubmit={onSubmit}>
          <div className="fields" id="name">
            <label>Nome</label>
            <input 
              type="text" 
              name="name"
              defaultValue={recoveredData.name}
              onChange={onChange}
              required
            />
          </div>

          <div className="row">
            <div className="fields">
              <label>Profissão</label>
              <input 
                type="text" 
                name="occupation" 
                onChange={onChange}
                defaultValue={recoveredData.occupation}
                required
              />
            </div>

            <div className="fields">
              <label>Celular</label>
              <InputMask 
                name="phone"
                type="text"
                onChange={onChange}
                required
                mask='(99) 99999-9999'
                maskPlaceholder='(99) 9999-9999'
                defaultValue={recoveredData.phone}
              />
            </div>
          </div>

          <div className="row">
            <div className="fields">
              <label>Meu IP</label>
              <input 
                type="text"
                name="ip"
                onChange={onChange}
                value={userIp ? userIp : recoveredData.ip} 
                readOnly
                required
              />
            </div>
            <div className="ip-button">
                <input type="button" value="ENCONTRAR IP" onClick={() => getUserIp()}/>
            </div>
          </div>

          <div className="action-buttons">
            <input type="submit" value="SALVAR" className='btn'/>
            <input 
              type="button" 
              value="LIMPAR" 
              className='btn' 
              onClick={() => handleClearInputs()}
            />
          </div>

        </form>
      </div>
    </div>
  );
};

export default Form;
import React, { useState, useEffect } from "react";

import api from "../../services/client";

import "./style.css";

const initialValues = {
  name: '',
  occupation: '',
  phone: '',
  ip: '',
}

const Form = () => {
  const [userIp, setUserIp] = useState('');
  const [inputs, setInputs] = useState(initialValues);
  const [recoveredInputs, setRecoveredInputs] = useState(initialValues);

  useEffect(() => {
    recoverUserData()
  },[])

  function recoverUserData() {
    let recoverInputs = localStorage.getItem('inputs');
    let recovered = recoverInputs !== null ? JSON.parse(recoverInputs) : {};
    setRecoveredInputs(recovered);
    console.log(recovered);
  }

  function onChange(event:any) {
    const { name, value } = event.target

    setInputs({...inputs, [name]: value})
  }


  const onSubmit = (event:any) => {
    event.preventDefault();

    localStorage.setItem('inputs', JSON.stringify(inputs))

    alert(JSON.stringify(inputs));
  }


  function handleClearInputs() {
    setRecoveredInputs(initialValues);
    setInputs(initialValues);
    setUserIp('');
    localStorage.clear();
    console.log(recoveredInputs)
  }


  function getUserIp(){
    api
    .get('/ip')
    .then((response) => {
        setUserIp(response.data);
      })
    .catch((err) => {
        console.log('Opa...' + err);
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
              defaultValue={recoveredInputs.name || ""}
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
                defaultValue={recoveredInputs.occupation || ""}
                required
              />
            </div>

            <div className="fields">
              <label>Celular</label>
              <input
                type="text"
                name="phone"
                onChange={onChange}
                defaultValue={recoveredInputs.phone || ""}
                required
              />
            </div>
          </div>

          <div className="row">
            <div className="fields">
              <label>Meu IP</label>
              <input 
                type="text"
                name="ip"
                readOnly 
                value={userIp ? userIp : recoveredInputs.ip || ""} 
                onChange={onChange}
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

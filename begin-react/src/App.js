import React, { useEffect, useState } from 'react';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import MainTemplate from './components/MainTemplate';
import Head from './components/Head';
import FixedList from './components/FixedList';
import { FixedProvider } from './components/Context';



const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [fileLimit, setFileLimit] = useState(null);

  const fetchData = () => {
    fetch('http://localhost:8080/fileLimit')
      .then((Response) => Response.json())
      .then((data) => setFileLimit(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    fetch('http://localhost:8080/fileLimit', { 
      method: 'POST',
      body: name,
    }).then(() => fetchData());
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    fetch(`http://localhost:8080/fileLimit/${id}`, {
      method: 'DELETE'
    }).then(() => fetchData());
  };

  return (
    <>
      <GlobalStyle />
      <MainTemplate>
        <Head />
        <h3 style={{paddingLeft: 20}}>고정 확장자</h3>
        <FixedProvider>
          <FixedList />
        </FixedProvider>
        <h3 style={{paddingLeft: 20}}>선택 확장자</h3>
        <form onSubmit={onSubmitHandler}>
          <input name='name'/>
          <input type='submit' value='추가'/>
        </form>
        <div style={{ display: 'grid',gridTemplateColumns: 'repeat(5, 1fr)'}}>
          {fileLimit?.filter((limit) => limit.type === 'CUSTOM').map((limit) => (
            <div key={limit.id} 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                border: '1px solid black',
                padding: '5px',
                margin: '2px',
                borderRadius: '5px',
                }}
              >
              <div>{limit.name}</div>
              <button onClick={onClickHandler} id={limit.id}>X</button>
            </div>
            
          ))}
        </div>
      </MainTemplate> 
      
    </>
  );
}

export default App;

import React, { useEffect, useState } from 'react';
import './App.css';
import { createGlobalStyle } from 'styled-components';
import MainTemplate from './components/MainTemplate';
import Head from './components/Head';



const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const [fileLimit, setFileLimit] = useState(null);

  const fetchData = () => {
    fetch('http://3.36.200.203:8080/fileLimit')
      .then((Response) => Response.json())
      .then((data) => setFileLimit(data));
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    fetch('http://3.36.200.203:8080/fileLimit', { 
      method: 'POST',
      body: name,
    }).then(() => fetchData());
  };

  const onClickHandler = (e) => {
    e.preventDefault();
    const id = e.target.id;
    console.log(id);
    fetch(`http://3.36.200.203:8080/fileLimit/${id}`, {
      method: 'DELETE'
    }).then(() => fetchData());
  };

  const data = [
    { id: 1, label: 'bat', checked: false },
    { id: 2, label: 'cmd', checked: false },
    { id: 3, label: 'com', checked: false },
    { id: 4, label: 'cpl', checked: false },
    { id: 5, label: 'exe', checked: false },
    { id: 6, label: 'scr', checked: false },
    { id: 7, label: 'js', checked: false },
  ];

  function MyComponent({ fileLimit }) {
    const [items, setItems] = useState(data);
  
    useEffect(() => {
      if (fileLimit) {
        const updatedItems = items.map((item) => {
          const fileLimitItem = fileLimit.find((limit) => limit.name === item.label && limit.type === 'FIXED');
          if (fileLimitItem) {
            return { ...item, checked: true, id: fileLimitItem.id };
          } else {
            return item;
          }
        });
        setItems(updatedItems);
      }
    }, [fileLimit]);
  
    return items;
  }

  const onCheckboxClickHandler = (e) => {
    const id = e.target.id;
    const isChecked = e.target.checked;
  
    // 체크박스를 체크할 경우, 서버에 POST 요청 보내기
    if (isChecked) {
      fetch('http://3.36.200.203:8080/fileLimit', { 
        method: 'POST',
        body: id
      })
        .then(() => fetchData());
    }
    // 체크박스를 체크해제할 경우, 서버에 DELETE 요청 보내기
    else {
      const limitId = fileLimit.find((limit) => limit.name === id)?.id;
      if (limitId) {
        fetch(`http://3.36.200.203:8080/fileLimit/${limitId}`, {
          method: 'DELETE'
        })
          .then(() => fetchData());
      }
    }
  };

  return (
    <>
      <GlobalStyle />
      <MainTemplate>
        <Head />
        <h3 style={{paddingLeft: 20}}>고정 확장자</h3>
        {/* <FixedProvider>
          <FixedList />
        </FixedProvider> */}
        <div style={{ display: 'flex', flexDirection: 'row', paddingLeft: 20, paddingBottom: 20, borderBottom: '1px solid #e9ecef'}}>
          {MyComponent({ fileLimit }).map((item) => (
            <div key={item.id} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', paddingLeft: 5, alignItems: 'center'}}>
              <input type='checkbox' id={item.label} checked={fileLimit?.some((limit) => limit.name === item.label)} onChange={onCheckboxClickHandler} style={{ marginRight: 5 }}/>
              <div style={{ display: 'flex' }}>{item.label}</div>
            </div>
          ))}
        </div>
        

        <h3 style={{paddingLeft: 20}}>선택 확장자</h3>
        <form onSubmit={onSubmitHandler} style={{paddingLeft: 20}}>
          <input name='name' maxLength={20} disabled={fileLimit?.filter((limit) => limit.type === 'CUSTOM').length >= 201}/>
          <input type='submit' value='추가'/>
          <div style={{paddingTop: 10, color: fileLimit?.filter((limit) => limit.type === 'CUSTOM').length === 200 ? 'red' : 'inherit'}}>{fileLimit?.filter((limit) => limit.type === 'CUSTOM').length}/200</div>
        </form>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', paddingLeft: 20, paddingTop: 10}}>
          {fileLimit?.filter((limit) => limit.type === 'CUSTOM').map((limit) => (
            <div key={limit.id} 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                border: '1px solid black',
                padding: '5px',
                margin: '2px',
                borderRadius: '4px',
                }}
              >
              <div style={{paddingRight: 5}}>{limit.name}</div>
              <button onClick={onClickHandler} id={limit.id}>X</button>
            </div>
            
          ))}
        </div>
      </MainTemplate> 
      
    </>
  );
}

export default App;

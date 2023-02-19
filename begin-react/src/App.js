import React from 'react';
import './App.css';
import AxiosApi from './AxiosApi';
import { createGlobalStyle } from 'styled-components';
import MainTemplate from './components/MainTemplate';
import Head from './components/Head';
import List from './components/List';


const GlobalStyle = createGlobalStyle`
  body {
    background: #e9ecef;
  }
`;

function App() {
  const name = 'react';
  const style = {
    backgroundColor: 'black',
    color: 'aqua',
    fontSize: 24, // 기본 단위 px
    padding: '1rem' // 다른 단위 사용 시 문자열로 설정
  }
  return (
    <>
      <GlobalStyle />
      <MainTemplate>
        <Head />
        <p>고정 확장자</p><input></input><br />
        <p>선택 확장자</p><input></input><br />
        <List />
        <AxiosApi />
      </MainTemplate> 
      
    </>
  );
}

export default App;

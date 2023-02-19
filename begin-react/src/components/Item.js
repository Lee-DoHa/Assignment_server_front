import React from 'react';
import styled, { css } from 'styled-components';
import { MdDone } from 'react-icons/md';
import { useFixedDispatch } from './Context';

const ItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
  padding-bottom: 2px;
`;

const CheckCircle = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 15px;
  border: 1px solid #ced4da;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  cursor: pointer; 
  ${props =>
    props.done &&
    css`
      border: 1px solid #38d9a9;
      color: #38d9a9;
    `}
`;

const Text = styled.div`
  flex: 1;
  font-size: 15px;
  color: #495057;
  ${props =>
    props.done &&
    css`
      color: #20c997;
    `}
`;

function Item({ id, done, text }) {
    const dispatch = useFixedDispatch();
    const onToggle = () => dispatch({ type: 'TOGGLE', id})
  return (
    <ItemBlock>
      <CheckCircle done={done} onClick={onToggle}>
        {done && <MdDone />}
      </CheckCircle>
      <Text done={done}>{text}</Text>
    </ItemBlock>
  );
}

export default Item;
import React from 'react';
import styled from 'styled-components';
import { MdDelete } from 'react-icons/md';
import { useCustomDispatch } from './CustomContext';

const Remove = styled.div`
  color: #dee2e6;
  align-items: center;
  justify-content: center;
  font-size: 15px;
  cursor: pointer;
  &:hover {
    color: #ff6b6b;
  }
  
`;

const CustomItemBlock = styled.div`
  display: flex;
  align-items: center;
  padding-top: 12px;
  padding-bottom: 12px;
  padding-left: 10px;
  &:hover {
    ${Remove} {
      display: initial;
    }
  }
`;

const Text = styled.div`
  flex: 1;
  font-size: 15px;
  color: #38d9a9;
`;

function CustomItem({ id, text }) {
  const dispatch = useCustomDispatch();
  const onRemove = () => dispatch({ type: 'REMOVE', id });
  return (
    <CustomItemBlock>
      <Text>{text}</Text>
      <Remove onClick={onRemove}>
        <MdDelete />
      </Remove>
    </CustomItemBlock>
  );
}

export default CustomItem;
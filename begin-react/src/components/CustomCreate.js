import React, {useState} from 'react';
import styled from 'styled-components';
import { useCustomDispatch, useCustomNextId } from './CustomContext';

const CustomInputBlock = styled.div`
  display: flex;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 20px;

  
`;

function CustomCreate() {
    const [value, setValue] = useState('');
  
    const dispatch = useCustomDispatch();
    const nextId = useCustomNextId();
  
    const onChange = e => setValue(e.target.value);
    const onSubmit = e => {
      e.preventDefault(); // 새로고침 방지
      dispatch({
        type: 'CREATE',
        todo: {
          id: nextId.current,
          text: value
        }
      });
      setValue('');
      nextId.current += 1;
    };


  return (
    <CustomInputBlock>
      <input onChange={onChange} value={value} />
      <button onSubmit={onSubmit}>추가</button>
    </CustomInputBlock>
  );
}

export default CustomCreate;
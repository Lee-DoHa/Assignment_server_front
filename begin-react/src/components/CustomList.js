import React from 'react';
import styled from 'styled-components';
import CustomItem from './CustomItem';
import { useCustomState } from './CustomContext';

const CustomListBlock = styled.div`
  padding: 20px 32px;
  padding-bottom: 48px;
  overflow-y: auto;

`;

function CustomList() {
    const limits = useCustomState();
    return (
        <CustomListBlock style = {{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)'}}>
            {limits.map(limit => (
                <CustomItem
                    key={limit.id}
                    id={limit.id}
                    text={limit.text}
                />
            ))}
        </CustomListBlock>
      );
}

export default CustomList;
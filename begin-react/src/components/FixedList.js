import React from 'react';
import styled from 'styled-components';
import { useFixedState } from './Context';
import Item from './Item';

const FixedListBlock = styled.div`
  padding: 20px 32px;
  padding-bottom: 48px;
  border-bottom: 1px solid #e9ecef;
`;

function FixedList() {
    const fixedItems = useFixedState();
    return (
        <FixedListBlock style = {{display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)'}}>
          {fixedItems.map( fix => (
            <Item
            key={fix.id}
            id={fix.id}
            limit_id={fix.limit_id}
            text={fix.text}
            done={fix.done}
            />
          ))}
        </FixedListBlock>
      );
}

export default FixedList;
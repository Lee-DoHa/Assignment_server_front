import React from 'react';
import styled from 'styled-components';

const HeadBlock = styled.div`
  padding-top: 30px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }
  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 15px;
    font-weight: bold;
  }
`;

function Head() {
  return (
    <HeadBlock>
      <h1>확장자 차단</h1>
      <div className="tasks-left">차단할 확장자를 선택 or 직접 입력하세요</div>
    </HeadBlock>
  );
}

export default Head;
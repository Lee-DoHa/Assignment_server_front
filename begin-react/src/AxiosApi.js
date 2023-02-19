import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosApi() {
    
  const [limits, setLimits] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLimits = async () => {
      try {
        // 요청이 시작 할 때에는 error 와 users 를 초기화하고
        setError(null);
        setLimits(null);
        // loading 상태를 true 로 바꿉니다.
        setLoading(true);
        const response = await axios.get(
          'http://localhost:8080/fileLimit'
        );
        console.log('성공')
        setLimits(response.data); // 데이터는 response.data 안에 들어있습니다.
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };

    fetchLimits();
  }, []);

  if (loading) return <div>로딩중..</div>;
  if (error) return <div>에러가 발생했습니다</div>;
  if (!limits) return null;
  return (
    <ul>
      {limits.map(limit => (
        <li key={limit.id}>
          {limit.name} ({limit.type})
        </li>
      ))}
    </ul>
  );
}
export default AxiosApi;
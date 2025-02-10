import { useEffect, useState } from 'react';
import axios from 'axios';

export default function RefrigeratorList() {
  const [refrigerators, setRefrigerators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRefrigerators();
  }, []);

  const fetchRefrigerators = async () => {
    try {
      const response = await axios.get(
        'http://localhost:9999/api/refrigerator'
      );
      if (
        response.data &&
        typeof response.data === 'object' &&
        response.data.Data &&
        Array.isArray(response.data.Data)
      ) {
        const formattedData = response.data.Data.map((item) => ({
          refrigerator_id: item.Refrigerator_id,
          person_name: item.Person_name,
          person_birthday: item.Person_birthday,
          entry_date: item.Entry_date,
          exit_date: item.EXIT_DATE,
        }));
        setRefrigerators(formattedData);
      } else {
        console.error('서버 응답 이상', response.data);
        setRefrigerators([]);
      }
    } catch (error) {
      console.error('냉장고 데이터를 가져오는 중 오류 발생:', error);
      setRefrigerators([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>냉장고 목록</h1>
      {loading ? (
        <p>데이터를 불러오는 중...</p>
      ) : (
        <div>
          {refrigerators.length > 0 ? (
            refrigerators.map((item) => (
              <div key={item.refrigerator_id}>
                <p>고인명: {item.person_name || '정보 없음'}</p>
                <p>생년월일: {item.person_birthday || '정보 없음'}</p>
                <p>입관일: {item.entry_date || '정보 없음'}</p>
                <p>출관일: {item.exit_date || '정보 없음'}</p>
              </div>
            ))
          ) : (
            <p>표시할 냉장고 데이터가 없습니다.</p>
          )}
        </div>
      )}
      <button onClick={fetchRefrigerators}>새로고침</button>
    </div>
  );
}

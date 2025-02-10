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
      const response = await axios
        .get('http://localhost:9999/api/refrigerator')
        .then((res) => {
          console.log(`데이터:${res.data}`);
          const formattedData = res.data.data.map((item) => ({
            refrigerator_id: item.refrigerator_id,
            person_name: item.person_name,
            person_birthday: item.person_birthday,
            entry_date: item.entry_date,
            exit_date: item.exit_date,
          }));
          setRefrigerators(formattedData);
        })

        .catch((res) => {
          console.log('실패함', res.data.error);
        });
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

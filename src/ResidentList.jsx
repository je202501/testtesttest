import { useEffect, useState } from 'react';
import axios from 'axios';

export default function ResidentList() {
  const [residents, setResidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResidents();
  }, []);

  const fetchResidents = async () => {
    try {
      const response = await axios
        .get('http://localhost:9999/api/resident')
        .then((res) => {
          console.log(`상주:${res.data.data}`);
          const formattedData = res.data.data.map((item) => ({
            resident_id: item.resident_id,
            resident_name: item.resident_name,
            primary_resident: item.primary_resident,
            refrigerator_id: item.refrigerator_id,
          }));
          setResidents(formattedData);
        })
        .catch((res) => {
          console.log('실패', res.data.message);
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>상주 목록</h1>
      {loading ? (
        <p>데이터 불러오는 중...</p>
      ) : (
        <div>
          {residents.length > 0 ? (
            residents.map((item) => (
              <div key={item.resident_id}>
                <p>상주명: {item.resident_name || '정보 없음'}</p>
                <p>냉장고 No: {item.refrigerator_id || '정보 없음'}</p>
                <p>대표: {item.primary_resident ? '맞음' : '아님'}</p>
              </div>
            ))
          ) : (
            <p>표시할 상주 데이터가 없습니다.</p>
          )}
        </div>
      )}
      <button onClick={fetchResidents}>새로고침</button>
    </div>
  );
}

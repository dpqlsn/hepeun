import { useState } from "react";
import useFacilities from "./hooks/useFacilities";
import type { Facility } from "./types/type";
import * as _ from "./style";

export default function App() {
  const { facilities, loading, error } = useFacilities();
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);

  return (
    <_.Container>
      <_.Title>부산 장애인 복지 시설 정보</_.Title>

      {loading && <_.Message>로딩 중...</_.Message>}
      {error && <_.ErrorMessage>{error}</_.ErrorMessage>}

      <_.List>
        {facilities.map((facility) => (
          <_.ListItem
            key={facility.id}
            selected={selectedFacility?.id === facility.id}
            onClick={() => setSelectedFacility(facility)}
          >
            <strong>{facility.name}</strong>
            <br />
            <small>{facility.address}</small>
          </_.ListItem>
        ))}
      </_.List>

      {selectedFacility && (
        <_.Detail>
          <h2>{selectedFacility.name}</h2>
          <p>주소: {selectedFacility.address}</p>
          <p>전화번호: {selectedFacility.phone}</p>
          <p>운영형태: {selectedFacility.type}</p>
          <p>서비스 내용: {selectedFacility.service}</p>
          <_.CloseButton onClick={() => setSelectedFacility(null)}>닫기</_.CloseButton>
        </_.Detail>
      )}
    </_.Container>
  );
}
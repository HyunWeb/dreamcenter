import { MapStore, UseModalStore } from "@/store/userStore";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { geocode } from "./geocode";

const MapDiv = styled.div<{ $isMenuOpen: boolean }>`
  z-index: 0;
  width: 100%;
  height: 400px;
  transition-duration: 500ms;
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "1")};
`;

export default function NaverMap() {
  const { isMenuOpen } = UseModalStore();
  const mapRef = useRef<HTMLDivElement | null>(null);
  // 확장 기능에 대비한 상태관리
  const [map, setMap] = useState<naver.maps.Map | null>(null);
  const { address, editAdress } = MapStore();

  useEffect(() => {
    const initMap = async () => {
      if (!mapRef.current) return;

      try {
        const { latitude, longitude } = await geocode(editAdress || address);
        const position = new window.naver.maps.LatLng(latitude, longitude);

        const mapInstance = new window.naver.maps.Map(mapRef.current, {
          zoomControl: true,
          zoomControlOptions: {
            style: window.naver.maps.ZoomControlStyle.SMALL,
            position: window.naver.maps.Position.TOP_RIGHT,
          },
          center: position,
          zoom: 17,
        });

        var marker = new window.naver.maps.Marker({
          position,
          map: mapInstance,
        });

        window.naver.maps.Event.addListener(marker, "click", () => {
          mapInstance.setCenter(position);
          mapInstance.setZoom(17);
        });

        setMap(mapInstance);
      } catch (err) {
        console.error("주소 변환 실패:", err);
      }
    };

    initMap();
  }, [editAdress]);

  return <MapDiv ref={mapRef} $isMenuOpen={isMenuOpen} />;
}

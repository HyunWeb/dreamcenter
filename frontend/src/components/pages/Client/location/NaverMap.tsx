import { UseModalStore } from "@/store/userStore";
import { useEffect, useRef } from "react";
import styled from "styled-components";

const MapDiv = styled.div<{ $isMenuOpen: boolean }>`
  width: 100%;
  height: 400px;
  transition-duration: 500ms;
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "0" : "1")};
`;

export default function NaverMap() {
  const { isMenuOpen } = UseModalStore();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const latitude = 35.8705550791362; // 위도
  const longitude = 128.633896826138; // 경도

  useEffect(() => {
    if (!mapRef.current) return;

    var map = new window.naver.maps.Map(mapRef.current, {
      zoomControl: true,
      zoomControlOptions: {
        style: window.naver.maps.ZoomControlStyle.SMALL,
        position: window.naver.maps.Position.TOP_RIGHT,
      },
      center: new window.naver.maps.LatLng(latitude, longitude),
      zoom: 17,
    });

    var marker = new window.naver.maps.Marker({
      position: new window.naver.maps.LatLng(latitude, longitude),
      map,
    });

    window.naver.maps.Event.addListener(marker, "click", () => {
      map?.setCenter(new window.naver.maps.LatLng(latitude, longitude));
      map?.setZoom(17);
    });
  }, []);

  return <MapDiv ref={mapRef} $isMenuOpen={isMenuOpen} />;
}

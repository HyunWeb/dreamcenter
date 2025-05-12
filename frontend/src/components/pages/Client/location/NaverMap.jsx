import { useEffect } from "react";

export default function NaverMap() {
  const latitude = 35.8705550791362; // 위도
  const longitude = 128.633896826138; // 경도

  useEffect(() => {
    var map = new window.naver.maps.Map("map", {
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

    new window.naver.maps.Event.addListener(marker, "click", () => {
      map?.setCenter(new window.naver.maps.LatLng(latitude, longitude));
      map?.setZoom(17);
    });
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }} />;
}

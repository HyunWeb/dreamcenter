import { GetGeocode } from "@/api/postApi";

export const geocode = async (address: string) => {
  const res = await GetGeocode(address);
  const { addresses } = res;
  if (!addresses.length) throw new Error("주소를 찾을 수 없습니다.");

  return {
    latitude: Number(addresses[0].y),
    longitude: Number(addresses[0].x),
  };
};

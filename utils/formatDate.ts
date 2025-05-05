export default function formatIndonesianDate(dateString: string): {
  tgl: string;
  wkt: string;
} {
  const date = new Date(dateString);

  // Nama hari dalam Bahasa Indonesia
  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

  // Nama bulan singkat dalam Bahasa Indonesia
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mei",
    "Jun",
    "Jul",
    "Agu",
    "Sep",
    "Okt",
    "Nov",
    "Des",
  ];

  // Konversi ke WIB (UTC+7)
  const wibDate = new Date(date.getTime() + 7 * 60 * 60 * 1000);

  const dayName = days[wibDate.getDay()];
  const day = wibDate.getDate().toString().padStart(2, "0");
  const month = months[wibDate.getMonth()];
  const year = wibDate.getFullYear();
  const hour = wibDate.getHours().toString().padStart(2, "0");
  const minute = wibDate.getMinutes().toString().padStart(2, "0");

  return {
    tgl: `${dayName}, ${day} ${month} ${year}`,
    wkt: `${hour}:${minute} WIB`,
  };
}

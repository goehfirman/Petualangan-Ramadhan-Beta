import { Coordinates, CalculationMethod, PrayerTimes, Madhab } from 'adhan';

export interface PrayerTimeSchedule {
  imsak: string;
  subuh: string;
  terbit: string;
  dhuha: string;
  dzuhur: string;
  ashar: string;
  maghrib: string;
  isya: string;
}

export const getJakartaPrayerTimes = (date: Date): PrayerTimeSchedule => {
  // Jakarta Coordinates from the image
  const coordinates = new Coordinates(-6.21, 106.85);
  
  // Kemenag RI parameters
  // Fajr: 20 degrees
  // Isha: 18 degrees
  // Imsak: 10 mins before Fajr
  // Dhuha: Sun altitude 4.5 degrees (approx 20-25 mins after sunrise)
  
  const params = CalculationMethod.Singapore();
  params.madhab = Madhab.Shafi;
  params.fajrAngle = 20;
  params.ishaAngle = 18;
  
  const prayerTimes = new PrayerTimes(coordinates, date, params);
  
  // Helper to format time
  const formatTime = (time: Date) => {
    return time.toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Asia/Jakarta',
      hour12: false
    });
  };

  // Imsak is 10 minutes before Fajr
  const imsakTime = new Date(prayerTimes.fajr.getTime() - 10 * 60 * 1000);
  
  // Dhuha (approx 24 mins after sunrise based on image 05:57 -> 06:21)
  // Or use adhan's sunrise + fixed offset. 
  // Let's use sunrise + 24 minutes to match the schedule closely
  const dhuhaTime = new Date(prayerTimes.sunrise.getTime() + 24 * 60 * 1000);

  return {
    imsak: formatTime(imsakTime),
    subuh: formatTime(prayerTimes.fajr),
    terbit: formatTime(prayerTimes.sunrise),
    dhuha: formatTime(dhuhaTime),
    dzuhur: formatTime(prayerTimes.dhuhr),
    ashar: formatTime(prayerTimes.asr),
    maghrib: formatTime(prayerTimes.maghrib),
    isya: formatTime(prayerTimes.isha)
  };
};

import { useEffect, useState } from "react";

function getMontrealTime() {
  return new Date().toLocaleTimeString("fr-FR", {
    timeZone: "America/Montreal",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function useClock() {
  const [localeMontrealTime, setLocaleMontrealTime] = useState(() => {
    return getMontrealTime();
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setLocaleMontrealTime(getMontrealTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return localeMontrealTime;

}

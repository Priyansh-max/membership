  export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);
  
    return remainingDays.toFixed(0);
  };

  // import { useState, useEffect } from 'react';

  // export const daysLeft = (deadline) => {
  //   const [remainingDays, setremainingDays] = useState(deadline);

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //       setremainingDays((prevDays) => prevDays - 1);
  //     }, 24 * 60 * 60 * 1000); // Update every 24 hours

  //     return () => clearInterval(intervalId); // Cleanup interval on component unmount

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, []); // Empty dependency array to run the effect only once on mount

  //   return remainingDays.toFixed(0);
  // };
  
  export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);
  
    return percentage;
  };
  
  export const checkIfImage = (url, callback) => {
    const img = new Image();
    img.src = url;
  
    if (img.complete) callback(true);
  
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
  };
import { reports, reportsPayload } from '@/apiHandlers/reportsApi';
import { defaultUser } from '@/data/defaultUser';
import React, { useEffect, useState } from 'react';

const Reports = (actionType = 'home', itemID = null) => {
  const [listOfdata, setListOfData] = useState(defaultUser);

  const handleReportApiCall = async () => {
    reportsPayload.actionType = actionType;
    if (itemID && itemID !== null) {
      reportsPayload.itemID = itemID;
    }
    const results = await reports();

    const statusStr = String(results?.status);

    if (/^4\d{2}$/.test(statusStr)) {
      console.log('error', results);
    } else if (/^2\d{2}$/.test(statusStr)) {
      setListOfData(results?.data?.data[0] || { defaultUser });
    }
  };

  useEffect(() => {
    handleReportApiCall();
  }, []);

  return { listOfdata };
};

export default Reports;

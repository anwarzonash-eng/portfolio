import { reports, reportsPayload } from '@/apiHandlers/reportsApi';
import React, { useEffect, useState } from 'react';

const Reports = (actionType = 'home', itemID = null) => {
  const [listOfdata, setListOfData] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleReportApiCall = async () => {
    reportsPayload.actionType = actionType;
    if (itemID && itemID !== null) {
      reportsPayload.itemID = itemID;
    }

    const results = await reports();

    const statusStr = String(results?.status);

    if (/^4\d{2}$/.test(statusStr)) {
      setLoading(false);
      console.log('error', results);
    } else if (/^2\d{2}$/.test(statusStr)) {
      setLoading(false);
      setListOfData(results?.data?.data[0]);
    }
  };

  useEffect(() => {
    handleReportApiCall();
  }, []);

  return { listOfdata, loading };
};

export default Reports;

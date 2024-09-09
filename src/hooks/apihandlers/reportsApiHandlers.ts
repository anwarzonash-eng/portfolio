import { reportsSync } from '@/apiHandlers/reportsApi';

export const reportsApiHandler = async ({
  actionType,
  urlInfo,
  setLoading,
  setListOfData,
  itemID = null,
}) => {
  const payload: { actionType: any; domain: any; uniqueId: any; itemID?: any } =
    {
      actionType: actionType,
      domain: urlInfo?.domain,
      uniqueId: urlInfo?.uniqueID,
    };
  if (itemID && itemID !== null) {
    payload.itemID = itemID;
  }
  const results = await reportsSync(payload);
  const statusStr = String(results?.status);
  if (/^4\d{2}$/.test(statusStr)) {
    setLoading(false);
    console.log('error', results);
  } else if (/^2\d{2}$/.test(statusStr)) {
    setLoading(false);
    setListOfData(results?.data?.data[0]);
  }
};

import { categorySyncApi } from "@/apiHandlers/categoryApi";

export const handleCategoryPicture = async (
  idforPicture,
  setCategoryPictures
) => {
  const payload = {
    id: idforPicture,
  };

  const results = await categorySyncApi(payload);
  const statusStr = String(results?.status);
  if (/^4\d{2}$/.test(statusStr)) {
    // console.log('error', results);
  } else if (/^2\d{2}$/.test(statusStr)) {
    setCategoryPictures((prev) => ({
      ...prev,
      [idforPicture]: results.data?.data?.thumbnail,
    }));
  }
};

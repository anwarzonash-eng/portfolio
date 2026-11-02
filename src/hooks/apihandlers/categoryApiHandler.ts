import { categorySyncApi } from "@/apiHandlers/categoryApi";

/** category_id → thumbnail URL map kept in component state. */
export type CategoryPictureMap = Record<string | number, string | undefined>;

export const handleCategoryPicture = async (
  idforPicture: string | number,
  setCategoryPictures: (
    update: (prev: CategoryPictureMap) => CategoryPictureMap
  ) => void
) => {
  const payload = {
    id: idforPicture,
  };

  const results = await categorySyncApi(payload);
  const statusStr = String(results?.status);
  if (/^4\d{2}$/.test(statusStr)) {
  } else if (/^2\d{2}$/.test(statusStr)) {
    setCategoryPictures((prev) => ({
      ...prev,
      [idforPicture]: results.data?.data?.thumbnail,
    }));
  }
};

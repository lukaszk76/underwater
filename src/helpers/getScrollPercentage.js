import { getDocumentHeight } from "./getDocumentHeight";

export const getScrollPercentage = () => {
  return 100 * (window.scrollY / getDocumentHeight());
};

const CLOUDINARY_REGEX = /https?:\/\/res\.cloudinary\.com\/.+\/image\/upload\//;

export function optimizeImageUrl(url, width = 1920) {
  if (!url || !CLOUDINARY_REGEX.test(url)) return url;
  return url.replace(
    "/image/upload/",
    `/image/upload/w_${width},q_auto,f_auto/`
  );
}

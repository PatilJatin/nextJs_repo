export const validateMediaFile = (
  file: File,
  maxSize: number
): {
  isValid: boolean;
  message: string;
} => {
  const maxSizeInBytes = maxSize * 1024 * 1024;

  const validMediaTypes = [
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/svg+xml",
    "video/mp4",
    "image/webp",
  ];

  if (!validMediaTypes?.includes(file?.type))
    return {
      isValid: false,
      message: `File type not supported: Use SVG, PNG, JPG or MP4 format`,
    };

  // Check file size
  if (file?.size > maxSizeInBytes) {
    return {
      isValid: false,
      message: `Your file exceeds the limit: Keep it under ${
        maxSizeInBytes / (1024 * 1024)
      } MB.`,
    };
  }

  // File passed all checks
  return { isValid: true, message: "" };
};

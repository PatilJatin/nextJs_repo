export const validateDocFile = (
  file: File,
  maxSize: number,
  validDocTypes: string[]
): {
  isValid: boolean;
  message: string;
} => {
  const maxSizeInBytes = maxSize * 1024 * 1024;

  if (!validDocTypes?.includes(file.type))
    return {
      isValid: false,
      message: `File type not supported: Use PDF format`,
    };

  if (file.size > maxSizeInBytes) {
    return {
      isValid: false,
      message: `Your file exceeds the limit: Keep it under ${
        maxSizeInBytes / (1024 * 1024)
      } MB.`,
    };
  }

  return { isValid: true, message: "" };
};

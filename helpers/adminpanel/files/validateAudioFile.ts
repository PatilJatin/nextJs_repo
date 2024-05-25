export const validateAudioFile = (
  file: File,
  maxSize: number,
  validMediaTypes: string[]
): {
  isValid: boolean;
  message: string;
} => {
  const maxSizeInBytes = maxSize * 1024 * 1024;

  if (!validMediaTypes?.includes(file?.type))
    return {
      isValid: false,
      message: `File type not supported: Use MP3 file format`,
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

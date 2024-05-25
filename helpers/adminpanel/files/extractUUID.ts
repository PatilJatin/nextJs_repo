export function extractUUID(url: string) {
  // Split the URL by '/'
  const parts = url?.split("/");

  // Find the segment containing the UUID
  const uuidSegment = parts?.find((part) =>
    part.match(
      /[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}/
    )
  );

  // Extract the UUID without the extension
  const uuid = uuidSegment?.split(".")[0];

  // Extract the file type extension
  const fileType = url?.split(".")?.pop()?.split("?")[0];

  if (uuid && fileType) {
    return `${uuid}.${fileType}`;
  }

  // If UUID or file type is not found, return null
  return "";
}

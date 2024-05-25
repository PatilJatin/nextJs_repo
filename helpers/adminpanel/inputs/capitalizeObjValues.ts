export function capitalizeObjValues<T extends Record<string, any>>(
  obj: T,
  excludeKeys: Array<keyof T> = []
): T {
  const isExcluded = (key: keyof T) => excludeKeys.includes(key);

  const capitalizeWords = (str: string) =>
    str.replace(/\b\w/g, (match) => match.toUpperCase());

  const capitalize = (value: any, key: keyof T) => {
    return isExcluded(key) ? value : capitalizeWords(value);
  };

  const result: Partial<T> = {};
  for (const [key, value] of Object.entries(obj)) {
    result[key as keyof T] = capitalize(value, key as keyof T);
  }

  return result as T;
}

export function corsPath(path: string) {
  const baseUrl = "";

  if (baseUrl === "" && path === "") {
    return "";
  }
  if (!path.startsWith("/")) {
    path = "/" + path;
  }

  if (!path.endsWith("/")) {
    path += "/";
  }

  return `${baseUrl}${path}`;
}

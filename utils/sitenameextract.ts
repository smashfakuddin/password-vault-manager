export function getSiteName(url:string) {
  const { hostname } = new URL(url);

  // remove www.
  let name = hostname.replace("www.", "");

  // remove domain extensions (.com, .net, .org, etc.)
  name = name.split(".")[0];

  // capitalize first letter
  return name.charAt(0).toUpperCase() + name.slice(1);
}

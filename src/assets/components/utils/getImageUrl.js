export function getImageUrl(folder, path) {
  return new URL(`../../images/${folder}/${path}`, import.meta.url).href;
}

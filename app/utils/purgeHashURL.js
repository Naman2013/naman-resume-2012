export default function purgeHashURL(URL) {
  return String.prototype.replace.call(URL, /.*[#]/, '');
}

const copyToClipboard = async (text) => {
  const el = document.createElement("textarea");
  el.value = text;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  const result = '';
  if ("clipboard" in navigator) {
    result = await navigator.clipboard.writeText(el.value);
  } else {
    result = document.execCommand("copy");
  }
  document.body.removeChild(el);
  return result;
};

export default copyToClipboard;
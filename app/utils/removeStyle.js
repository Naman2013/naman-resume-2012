export default function removeStyle(all) {
  let i = all.length;
  let j;
  let isHidden;

  // Presentational attributes.
  const attr = [
    'align',
    'background',
    'bgcolor',
    'border',
    'cellpadding',
    'cellspacing',
    'color',
    'face',
    'height',
    'hspace',
    'marginheight',
    'marginwidth',
    'noshade',
    'nowrap',
    'valign',
    'vspace',
    'width',
    'vlink',
    'alink',
    'text',
    'link',
    'frame',
    'frameborder',
    'clear',
    'scrolling',
    'style',
  ];

  const attrLength = attr.length;

  while (i--) {
    isHidden = (all[i].style.display === 'none');

    j = attrLength;

    while (j--) {
      all[i].removeAttribute(attr[j]);
    }

    // Re-hide display:none elements,
    // so they can be toggled via JS.
    if (isHidden) {
      all[i].style.display = 'none';
      isHidden = false;
    }
  }
}

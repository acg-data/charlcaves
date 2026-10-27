export const conceptImages = new Set(['bar-room', 'golf-room', 'cinema-room', 'garage-room', 'game-room', 'study-room', 'walnut-detail', 'leather-detail', 'cabinet-detail']);

// Full compositions on mobile; sharp, appropriately sized files on every display.
export function responsiveImages(html) {
  return html.replace(/<img\b[^>]*>/g, tag => {
    const name = tag.match(/src="\/assets\/img\/([^"/]+)\.webp"/)?.[1];
    if (!conceptImages.has(name)) return tag;
    const wide = tag.includes('data-image-layout="wide"');
    const sizes = wide
      ? '(max-width: 680px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 64px), (max-width: 1392px) calc(100vw - 112px), 1280px'
      : '(max-width: 680px) calc(100vw - 40px), (max-width: 1000px) calc(100vw - 64px), (max-width: 1392px) calc((100vw - 144px) / 2), 640px';
    return tag.replace(/>$/, ` srcset="/assets/img/${name}-480.webp 480w, /assets/img/${name}-960.webp 960w, /assets/img/${name}.webp 1536w" sizes="${sizes}">`);
  });
}

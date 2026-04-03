export default function manifest() {
  return {
    name: 'MR BUILD | Neural Node IDE',
    short_name: 'MR Build',
    description: 'Professional Cloud IDE for Web Development by MR ANAS NIDIR.',
    start_url: '/mr-build',
    display: 'standalone',
    background_color: '#050505',
    theme_color: '#00f0ff',
    icons: [
      {
        src: '/assets/icons/pwa-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/assets/icons/pwa-icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}

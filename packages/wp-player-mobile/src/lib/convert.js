import url from 'url'

/**
 * [url2api description]
 * @param  {string} readerUrl given URL
 * @return {string}     WP-API URL
 */
export const url2api = readerUrl => {
  // https://biwako.io/port-overlap-between-display-sharing-on-mac-and-docker-selenium/
  // https://biwako.io/wp-json/wp/v2/posts?slug=port-overlap-between-display-sharing-on-mac-and-docker-selenium
  const { protocol, host, pathname } = url.parse(readerUrl)
  const slug = pathname
    .split('/')
    .filter(x => !!x)
    .join('')
  return `${protocol}//${host}/wp-json/wp/v2/posts?slug=${slug}`
}

export const url2parts = readerUrl => {
  const { protocol, host, pathname } = url.parse(readerUrl)
  const slug = pathname
    .split('/')
    .filter(x => !!x)
    .join('')
  return { protocol, host, slug }
}

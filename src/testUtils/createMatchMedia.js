import mediaQuery from 'css-mediaquery';

export function createMatchMedia(width) {
    return (query) => ({
      matches: mediaQuery.match(query, {
        width: width,
      }),
      addListener: () => {},
      removeListener: () => {},
    });
  }
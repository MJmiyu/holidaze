export const fetcher = async (url) => {
  const result = await fetch(url);
  const json = await result.json();
  return json;
};

export const authenticatedFetcher = (jwt) => async (url) => {
  const result = await fetch(url, {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const json = await result.json();
  return json;
};

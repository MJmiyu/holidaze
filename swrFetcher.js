export const fetcher = (router) => async (url) => {
  try {
    const result = await fetch(url);

    if (result.status === 404) {
      router.push('/');
    }

    const json = await result.json();
    return json;
  } catch (e) {
    console.error(e);
  }
};

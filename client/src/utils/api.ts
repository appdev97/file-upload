export const httpClient = async <T = unknown>(
  url: string,
  options?: RequestInit
): Promise<T> => {
  const headers = {
    //   "Content-Type": "application/json",
  };
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...headers,
        ...options?.headers,
      },
    });
    return res.json();
  } catch (err) {
    throw new Error(`Something went wrong!`);
  }
};

export default httpClient;

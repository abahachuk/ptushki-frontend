export const makePostCall = (url: string, data: any): Promise<any> =>
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(async res => {
    if (!res.ok) {
      let message;
      try {
        message = await res.json();
      } catch {
        throw new Error(res.statusText);
      }

      throw new Error(message && message.error && message.message);
    }
    return res.json();
  });

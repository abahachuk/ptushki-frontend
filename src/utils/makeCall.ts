export const makePostCall = async (url: string, data: any): Promise<any> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    let message;
    try {
      message = await response.json();
    } catch {
      throw new Error(response.statusText);
    }

    throw new Error(message && (message.error || message.message));
  }
  return response.json();
};

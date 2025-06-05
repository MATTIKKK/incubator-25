export async function rephraseMessage(message: string): Promise<string> {
  const response = await fetch(`https://no-offense-1.onrender.com/ai/rephrase`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });

  if (!response.ok) {
    throw new Error(`Rephrase request failed: ${response.status}`);
  }

  const data = await response.json();
  return data.rephrased || message;
}

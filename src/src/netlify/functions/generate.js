import fetch from "node-fetch";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  const { prompt } = JSON.parse(event.body || "{}");
  if (!prompt) return { statusCode: 400, body: "Missing prompt" };

  const apiKey = process.env.GEMINI_API_KEY;        // bạn đã đặt ENV rồi
  const model = "gemini-1.5-flash";                 // đổi sang pro nếu muốn

  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );

  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.map(p => p.text).join("\n") || "";
  return { statusCode: 200, headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text }) };
};

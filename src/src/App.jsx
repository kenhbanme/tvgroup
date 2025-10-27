import React, { useState } from "react";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [out, setOut] = useState("");

  async function generate() {
    setOut("Generating...");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      setOut(data.text || JSON.stringify(data, null, 2));
    } catch (e) {
      setOut(String(e));
    }
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-semibold">AI Illustrated Article Writer</h1>
      <textarea
        className="w-full h-40 p-3 rounded bg-slate-800"
        placeholder="Enter your article topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generate}
        className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500"
      >
        Generate
      </button>
      <pre className="whitespace-pre-wrap bg-slate-800 p-3 rounded">{out}</pre>
    </main>
  );
}

exports.handler = async function(event) {
  const GEMINI_KEY = "AIzaSyAL1Ha_r1SsFGB5pDMBLDeTDs7Tz6WNctQ";
  const { prompt } = JSON.parse(event.body || "{}");
  if (!prompt) return { statusCode:400, body:"No prompt" };
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_KEY}`,
      { method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({contents:[{parts:[{text:prompt}]}]}) });
    const data = await res.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || null;
    return { statusCode:200, headers:{"Access-Control-Allow-Origin":"*"}, body:JSON.stringify({text}) };
  } catch(e) {
    return { statusCode:500, headers:{"Access-Control-Allow-Origin":"*"}, body:JSON.stringify({error:e.message}) };
  }
};

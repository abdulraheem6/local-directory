export async function onRequestGet({ env, request }) {
  const q = Object.fromEntries(
    new URL(request.url).searchParams
  );

  const path =
    `data/Telangana/Hyderabad/Kukatpally/${q.category}/${q.type}/details/${q.id}.json`;

  const file = await env.R2_BUCKET.get(path);

  return new Response(
    await file.text(),
    { headers: { "Content-Type": "application/json" } }
  );
}

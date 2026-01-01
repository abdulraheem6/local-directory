// export async function onRequestGet({ env, request }) {
//   const q = Object.fromEntries(
//     new URL(request.url).searchParams
//   );

//   const path =
//     `data/Telangana/Hyderabad/Kukatpally/${q.category}/${q.type}/details/${q.id}.json`;

//   const file = await env.R2_BUCKET.get(path);

//   return new Response(
//     await file.text(),
//     { headers: { "Content-Type": "application/json" } }
//   );
// }


export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);

  const path =
    `data/${params.state}/${params.district}/${params.mandal}/${params.category}/${params.type}/details/${params.id}.json`;

  const file = await env.R2_BUCKET.get(path);

  if (!file) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(await file.text(), {
    headers: { "Content-Type": "application/json" }
  });
}

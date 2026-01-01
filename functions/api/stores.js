// export async function onRequestGet({ env, request }) {
//   const q = Object.fromEntries(
//     new URL(request.url).searchParams
//   );

//   const base =
//     `data/Telangana/Hyderabad/${q.mandal}/${q.category}/${q.type}`;

//   const promotedObj =
//     await env.R2_BUCKET.get(`${base}/promoted.json`);

//   const basicObj =
//     await env.R2_BUCKET.get(`${base}/basic.json`);

//   return new Response(JSON.stringify({
//     promoted: promotedObj
//       ? JSON.parse(await promotedObj.text())
//       : [],
//     normal: basicObj
//       ? JSON.parse(await basicObj.text())
//       : []
//   }), {
//     headers: { "Content-Type": "application/json" }
//   });
// }


export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const params = Object.fromEntries(url.searchParams);

  const {
    state,
    district,
    mandal,
    category,
    type
  } = params;

  const basePath =
    `data/${state}/${district}/${mandal}/${category}/${type}`;

  const promotedObj =
    await env.R2_BUCKET.get(`${basePath}/promoted.json`);

  const basicObj =
    await env.R2_BUCKET.get(`${basePath}/basic.json`);

  return new Response(JSON.stringify({
    promoted: promotedObj
      ? JSON.parse(await promotedObj.text())
      : [],
    normal: basicObj
      ? JSON.parse(await basicObj.text())
      : []
  }), {
    headers: { "Content-Type": "application/json" }
  });
}

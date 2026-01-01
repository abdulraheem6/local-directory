//Hello guys

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


// export async function onRequestGet({ request, env }) {
//   const url = new URL(request.url);
//   const params = Object.fromEntries(url.searchParams);

//   const {
//     state,
//     district,
//     mandal,
//     category,
//     type
//   } = params;

//   const basePath =
//     `data/${state}/${district}/${mandal}/${category}/${type}`;

//   const promotedObj =
//     await env.R2_BUCKET.get(`${basePath}/promoted.json`);

//   const basicObj =
//     await env.R2_BUCKET.get(`${basePath}/basic.json`);

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

//working to test connection to r2 bucket for api
// export async function onRequestGet() {
//   return new Response(
//     JSON.stringify({ message: "API WORKING" }),
//     { headers: { "Content-Type": "application/json" } }
//   );
// }


export async function onRequestGet({ request, env }) {
  try {
    const url = new URL(request.url);
    const params = Object.fromEntries(url.searchParams);

    const { state, district, mandal, category, type } = params;

    // When no filters → empty result (your working case)
    if (!state || !district || !mandal || !category || !type) {
      return new Response(
        JSON.stringify({ promoted: [], normal: [] }),
        { headers: { "Content-Type": "application/json" } }
      );
    }

    const basePath =
      `data/${state}/${district}/${mandal}/${category}/${type}`;

    // 🔍 DEBUG: verify computed path
    // return new Response(JSON.stringify({ basePath }));

    const basicObj =
      await env.R2_BUCKET.get(`${basePath}/basic.json`);

    const promotedObj =
      await env.R2_BUCKET.get(`${basePath}/promoted.json`);

    const normal = basicObj
      ? JSON.parse(await basicObj.text())
      : [];

    const promoted = promotedObj
      ? JSON.parse(await promotedObj.text())
      : [];

    return new Response(
      JSON.stringify({ promoted, normal }),
      { headers: { "Content-Type": "application/json" } }
    );

  } catch (err) {
    return new Response(
      JSON.stringify({
        error: "R2 read failed",
        message: err.message
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

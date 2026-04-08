const fetch = globalThis.fetch || require('node-fetch');

async function main() {
  try {
    const plantRes = await fetch('http://localhost:3000/api/plants');
    console.log('GET /api/plants status', plantRes.status);
    const plants = await plantRes.text();
    console.log('GET /api/plants body length', plants.length);

    const dashboardRes = await fetch('http://localhost:3000/dashboard/plants');
    console.log('GET /dashboard/plants status', dashboardRes.status);
    const dashboardHtml = await dashboardRes.text();
    console.log('GET /dashboard/plants html length', dashboardHtml.length);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();

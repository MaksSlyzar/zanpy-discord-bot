import puppeteer from "puppeteer";

export async function getAlbionServerStatus() {
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.goto("https://www.albionstatus.com/", { waitUntil: "networkidle2" });

  const servers = await page.evaluate(() => {
    const serverElements = document.querySelectorAll(
      ".flex.flex-col.border-b.border-gray-100.p-6.text-center"
    );

    return Array.from(serverElements).map((el) => {
      const name = el.querySelector("dt")?.textContent?.trim() || "Unknown Server";
      const status = el.querySelector("dd")?.textContent?.trim()?.toLowerCase() || "offline";
      return {
        name,
        status: status === "online" ? "🟢 Онлайн" : "🔴 Офлайн",
      };
    });
  });

  console.log("📡 Статус серверів Albion Online:");
  servers.forEach((server) => console.log(`${server.name}: ${server.status}`));

  if (servers.length > 2) {
    servers.splice(3, servers.length - 1);
  }

  await browser.close();

  return servers;
}


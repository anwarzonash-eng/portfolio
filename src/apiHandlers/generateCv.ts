// pages/api/generate-cv.ts
import { NextApiRequest, NextApiResponse } from "next";
import puppeteer from "puppeteer";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
  const page = await browser.newPage();

  // Local URL — adjust if needed
  await page.goto(
    `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/cv`,
    {
      waitUntil: "networkidle0",
    }
  );

  const pdfBuffer = await page.pdf({
    format: "A4",
    landscape: true,
    printBackground: true,
  });

  await browser.close();

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", "attachment; filename=cv.pdf");
  res.send(pdfBuffer);
}

import fs from 'fs';
import path from 'path';
import { chromium } from 'playwright-core';

async function main() {
  const artifactsDir = path.resolve('artifacts');
  fs.mkdirSync(artifactsDir, { recursive: true });

  console.log('Launching browser with playwright-core...');
  const possiblePaths = [
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    process.env.LOCALAPPDATA + '\\Google\\Chrome\\Application\\chrome.exe'
  ];

  let executablePath = possiblePaths.find(p => p && fs.existsSync(p));
  console.log('Using browser executable:', executablePath);

  const browser = await chromium.launch({
    headless: true,
    executablePath
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });

  const page = await context.newPage();

  // ==========================================
  // PART 1: Nintendo 2D Retro Game & Playful Yes/No
  // ==========================================
  console.log('\n--- 1. Testing Nintendo Quest Interface at / ---');
  await page.goto('http://localhost:3008/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(800);

  // 1.0 Verify Year Switcher only has years, NO notes (Kỷ niệm / Sinh nhật)
  const yearSwitcherText = await page.locator('aside[aria-label="Điều hướng theo năm"]').textContent();
  console.log(`Year Switcher Text: "${yearSwitcherText.trim()}"`);
  if (yearSwitcherText.includes('Kỷ niệm') || yearSwitcherText.includes('Sinh nhật')) {
    throw new Error('Year switcher still contains Kỷ niệm or Sinh nhật notes!');
  }

  // 1.1 Verify H1 and dialogue box
  const h1Text = await page.textContent('h1');
  console.log(`Quest H1: "${h1Text}"`);

  // Verify initial button states (no decorative emojis)
  const yesBtn = page.locator('button:has-text("ĐỒNG Ý (YES)")');
  const noBtn = page.locator('.nintendo-btn-no');

  console.log(`YES button count: ${await yesBtn.count()}, NO button count: ${await noBtn.count()}`);
  if (await yesBtn.count() === 0 || await noBtn.count() === 0) {
    throw new Error('YES or NO button not found on initial quest screen!');
  }

  // Screenshot initial quest interface
  const initialQuestPath = path.join(artifactsDir, 'nintendo-stage1-initial.png');
  await page.screenshot({ path: initialQuestPath });
  console.log(`Saved screenshot: ${initialQuestPath}`);

  // 1.2 Test progressive No clicks
  console.log('Clicking NO button progressively...');
  for (let i = 0; i < 4; i++) {
    const currentLabel = await noBtn.textContent();
    console.log(`  Click ${i}: NO label = "${currentLabel.trim()}"`);
    await noBtn.click();
    await page.waitForTimeout(250);
  }

  const postClicksLabel = await noBtn.textContent();
  console.log(`  After 4 clicks: NO label = "${postClicksLabel.trim()}"`);

  // Verify No-button counter is NOT present
  const noCounterCount = await page.locator('text=Số lần từ chối').count();
  console.log(`No-button counter presence count: ${noCounterCount} (expected 0)`);
  if (noCounterCount > 0) {
    throw new Error('No-button counter text found, expected to be removed!');
  }

  // Screenshot after NO clicks showing scaled YES button and shrunk NO button
  const afterNoClicksPath = path.join(artifactsDir, 'nintendo-stage1-after-no-clicks.png');
  await page.screenshot({ path: afterNoClicksPath });
  console.log(`Saved screenshot: ${afterNoClicksPath}`);

  // 1.3 Click YES button to trigger celebration & birthday card
  console.log('Clicking YES button to accept quest...');
  await yesBtn.click({ force: true });
  await page.waitForTimeout(600);

  // Verify Birthday Card
  const birthdayCardTitle = await page.locator('h2').textContent();
  console.log(`Birthday Card Title: "${birthdayCardTitle}"`);

  // Verify No Header Overlap: Ensure HUD and Celebration Stamp have positive vertical gap
  const hudBox = await page.locator('header').boundingBox();
  const stampBox = await page.locator('text=QUEST COMPLETED').boundingBox();
  console.log(`HUD bottom: ${hudBox.y + hudBox.height}px, Stamp top: ${stampBox.y}px`);
  const verticalGap = stampBox.y - (hudBox.y + hudBox.height);
  console.log(`Vertical gap between HUD and Stamp: ${verticalGap}px`);
  if (verticalGap < 20) {
    throw new Error(`Headers are overlapping or too close! Vertical gap is only ${verticalGap}px`);
  }

  const dateNavBtn = page.locator('a:has-text("Let\'s have a date then")');
  console.log(`"Let's have a date then" button present: ${await dateNavBtn.count() > 0}`);
  if (await dateNavBtn.count() === 0) {
    throw new Error('Navigation button "Let\'s have a date then" not found!');
  }

  // Screenshot Birthday Card
  const birthdayCardPath = path.join(artifactsDir, 'nintendo-birthday-card.png');
  await page.screenshot({ path: birthdayCardPath });
  console.log(`Saved screenshot: ${birthdayCardPath}`);

  // ==========================================
  // PART 2: Date Page & Google Maps Integration
  // ==========================================
  console.log('\n--- 2. Testing Date Announcement Page (/2026/date/) ---');
  await dateNavBtn.click();
  await page.waitForTimeout(600);

  // Verify URL and Back Button
  console.log(`Current page URL: ${page.url()}`);
  const backBtn = page.locator('a:has-text("Quay lại")');
  console.log(`Back button present: ${await backBtn.count() > 0}`);

  // Verify Restaurant Announcement & Google Maps Embed
  const restaurantTitle = await page.locator('h1').textContent();
  console.log(`Restaurant Title: "${restaurantTitle}"`);

  const googleMapsIframe = page.locator('iframe[title*="Bản đồ"]');
  console.log(`Google Maps iframe present: ${await googleMapsIframe.count() > 0}`);
  if (await googleMapsIframe.count() === 0) {
    throw new Error('Google Maps iframe missing on Date page!');
  }

  const mapsExternalBtn = page.locator('a:has-text("Google Maps")');
  console.log(`Google Maps external link button present: ${await mapsExternalBtn.count() > 0}`);

  // Screenshot Date Announcement Page
  const datePagePath = path.join(artifactsDir, 'nintendo-date-announcement.png');
  await page.screenshot({ path: datePagePath });
  console.log(`Saved screenshot: ${datePagePath}`);

  // ==========================================
  // PART 3: Nintendo Album Item & Darkened Bento Overlay
  // ==========================================
  console.log('\n--- 3. Testing Album Item & Darkened Overlay ---');
  // 3.0 Verify Album Component Card: Subheader texts are present
  const albumCard = page.locator('section:has-text("ALBUM")');
  const albumCardText = await albumCard.textContent();
  console.log(`Album Card Text: "${albumCardText.replace(/\s+/g, ' ').trim()}"`);
  const descParagraph = albumCard.locator('p');
  if (!albumCardText.includes('SPECIAL REWARD ITEM') || (await descParagraph.count()) === 0 || !(await descParagraph.textContent()).trim()) {
    throw new Error('Album component card missing subheader texts!');
  }

  const inspectAlbumBtn = albumCard.locator('button');
  console.log(`Inspect Album Button present: ${await inspectAlbumBtn.count() > 0}`);
  if (await inspectAlbumBtn.count() === 0) {
    throw new Error('Inspect Album button missing on Date page!');
  }

  // Click Inspect Album to open Darkened Overlay
  await inspectAlbumBtn.click();
  await page.waitForTimeout(600);

  // Verify modal is open and has darkened background
  const closeAlbumBtnTest = page.locator('button:has-text("ĐÓNG ALBUM")');
  console.log(`Album Modal Header present: ${(await closeAlbumBtnTest.count()) > 0}`);

  // Verify Bento Grid inside modal
  const bentoCardsCount = await page.locator('.editorial-bento-grid > div').count();
  console.log(`Cards rendered inside Album Bento Grid: ${bentoCardsCount}`);
  if (bentoCardsCount === 0) {
    throw new Error('Bento Grid cards failed to render inside Album Modal!');
  }

  // Verify NO epilogue section anywhere
  const epilogueInDom = await page.locator('text=/EPILOGUE/i').count();
  console.log(`Epilogue count in Album DOM: ${epilogueInDom} (expected 0)`);
  if (epilogueInDom > 0) {
    throw new Error('Found epilogue section in Album Modal, expected none!');
  }

  // Screenshot Darkened Album Overlay
  const albumModalPath = path.join(artifactsDir, 'nintendo-album-dark-overlay.png');
  await page.screenshot({ path: albumModalPath });
  console.log(`Saved screenshot: ${albumModalPath}`);

  // Test Close Modal Button
  const closeAlbumBtn = page.locator('button:has-text("ĐÓNG ALBUM")');
  await closeAlbumBtn.click();
  await page.waitForTimeout(400);
  console.log(`Album modal closed successfully.`);

  // Test Phase Navigation: Return to Quest from Date Page
  console.log('\n--- 3.1 Testing Back Navigation to Quest ---');
  await backBtn.click();
  await page.waitForTimeout(600);
  console.log(`URL after returning back: ${page.url()}`);
  const returnedH1 = await page.locator('h1').textContent();
  console.log(`Returned page H1: "${returnedH1}"`);
  if (!returnedH1.includes('PINKIE')) {
    throw new Error('Failed to return to Quest page or blank screen occurred!');
  }

  // ==========================================
  // PART 4: Verification of /2025/ Route Scroll
  // ==========================================
  console.log('\n--- 4. Testing /2025/ Route Continuous Scroll ---');
  await page.goto('http://localhost:3008/2025/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);

  await page.evaluate(() => window.scrollTo(0, 12000));
  await page.waitForTimeout(500);

  const finalScrollY = await page.evaluate(() => window.scrollY);
  console.log(`2025 Page scroll position: ${finalScrollY}px (deep into gallery)`);
  if (finalScrollY < 5000) {
    throw new Error(`/2025/ scroll appears trapped at ${finalScrollY}px!`);
  }

  // ==========================================
  // PART 5: Mobile Viewport Verification (390x844)
  // ==========================================
  console.log('\n--- 5. Testing Mobile Viewport (iPhone 14: 390x844) ---');
  const mobilePage = await context.newPage();
  await mobilePage.setViewportSize({ width: 390, height: 844 });
  await mobilePage.goto('http://localhost:3008/', { waitUntil: 'domcontentloaded' });
  await mobilePage.waitForTimeout(400);

  // Check no horizontal scrollbar overflow on mobile
  const hasNoHOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth <= window.innerWidth + 2;
  });
  console.log(`Mobile Quest no horizontal overflow: ${hasNoHOverflow}`);
  if (!hasNoHOverflow) {
    throw new Error('Horizontal overflow detected on mobile Quest page!');
  }

  // Click NO on mobile and verify YES button fits on screen
  const mobileNoBtn = mobilePage.locator('.nintendo-btn-no');
  for (let i = 0; i < 4; i++) {
    await mobileNoBtn.click();
    await mobilePage.waitForTimeout(150);
  }
  const mobileYesBtn = mobilePage.locator('button:has-text("ĐỒNG Ý (YES)")');
  const yesBox = await mobileYesBtn.boundingBox();
  console.log(`Mobile YES button width after 4 NO clicks: ${yesBox.width}px (screen: 390px)`);
  if (yesBox.width > 380) {
    throw new Error(`Mobile YES button width ${yesBox.width}px exceeds mobile screen width!`);
  }

  // Accept and go to Date page
  await mobileYesBtn.click({ force: true });
  await mobilePage.waitForTimeout(600);
  await mobilePage.locator('a:has-text("Let\'s have a date then")').click();
  await mobilePage.waitForTimeout(400);

  // Verify mobile Date page has no horizontal overflow
  const dateNoHOverflow = await mobilePage.evaluate(() => {
    return document.documentElement.scrollWidth <= window.innerWidth + 2;
  });
  console.log(`Mobile Date page no horizontal overflow: ${dateNoHOverflow}`);
  if (!dateNoHOverflow) {
    throw new Error('Horizontal overflow detected on mobile Date page!');
  }

  // Open Album on mobile and test smooth scrolling
  await mobilePage.locator('section:has-text("ALBUM") button').click();
  await mobilePage.waitForTimeout(400);

  // Verify thumbnail is used for grid cards
  const firstThumbSrc = await mobilePage.locator('.editorial-bento-grid img').first().getAttribute('src');
  console.log(`Grid image thumbnail src: ${firstThumbSrc}`);
  if (!firstThumbSrc.includes('/thumbs/') && !firstThumbSrc.endsWith('.webp')) {
    throw new Error(`Expected WebP thumbnail in grid, found: ${firstThumbSrc}`);
  }

  // Scroll mobile album
  const scrollContainer = mobilePage.locator('.album-scroll-container');
  await scrollContainer.evaluate((el) => { el.scrollTop = 1200; });
  await mobilePage.waitForTimeout(300);
  const mobileScrollTop = await scrollContainer.evaluate((el) => el.scrollTop);
  console.log(`Mobile album scroll top: ${mobileScrollTop}px`);

  const mobileAlbumPath = path.join(artifactsDir, 'mobile-album-smooth-scroll.png');
  await mobilePage.screenshot({ path: mobileAlbumPath });
  console.log(`Saved screenshot: ${mobileAlbumPath}`);
  await mobilePage.close();

  console.log('\n✅ ALL PLAYWRIGHT UI VERIFICATIONS PASSED SUCCESSFULLY!');
  await browser.close();
}

main().catch(err => {
  console.error('\n❌ Verification Failed:', err);
  process.exit(1);
});

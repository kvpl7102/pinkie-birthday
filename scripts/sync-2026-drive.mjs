import fs from 'fs';
import path from 'path';

const home = process.env.USERPROFILE || process.env.HOME;
const tokenPath = path.join(home, '.gemini', 'antigravity-cli', 'mcp_oauth_tokens.json');

if (!fs.existsSync(tokenPath)) {
  console.error('Token file not found:', tokenPath);
  process.exit(1);
}

const tokensData = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
const entry = tokensData['https://drivemcp.googleapis.com/mcp/v1'] || Object.values(tokensData)[0];

async function getAccessToken() {
  console.log('Refreshing Google OAuth access token...');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: entry.client_id,
      client_secret: entry.client_secret,
      refresh_token: entry.token.refresh_token,
      grant_type: 'refresh_token'
    })
  });
  const data = await res.json();
  if (!data.access_token) {
    throw new Error('Failed to refresh token: ' + JSON.stringify(data));
  }
  entry.token.access_token = data.access_token;
  try {
    fs.writeFileSync(tokenPath, JSON.stringify(tokensData, null, 2));
  } catch (e) {
    // ignore if write fails
  }
  return data.access_token;
}

const DEST_DIR = path.resolve('public/img/2026');

async function downloadFile(accessToken, fileId, fileName, expectedSize) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
  const outPath = path.join(DEST_DIR, fileName);
  if (fs.existsSync(outPath)) {
    const stat = fs.statSync(outPath);
    if (stat.size > 0 && (!expectedSize || Math.abs(stat.size - expectedSize) < 100)) {
      console.log(`Skipping (already up to date): ${fileName}`);
      return false;
    }
  }

  console.log(`Downloading: ${fileName} ...`);
  const url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  if (!res.ok) {
    console.error(`Failed to download ${fileName}: ${res.statusText}`);
    return false;
  }
  const buffer = await res.arrayBuffer();
  fs.writeFileSync(outPath, Buffer.from(buffer));
  console.log(`Downloaded: ${fileName} (${(buffer.byteLength / 1024).toFixed(1)} KB)`);
  return true;
}

async function run() {
  const accessToken = await getAccessToken();
  console.log('Searching for "her-photos" folder...');
  const qParent = "name = 'her-photos' and mimeType = 'application/vnd.google-apps.folder' and trashed = false";
  const resParent = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qParent)}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  const dataParent = await resParent.json();
  
  let targetFolderId = null;
  if (dataParent.files && dataParent.files.length > 0) {
    const parent = dataParent.files[0];
    console.log(`Found parent folder: ${parent.name} (${parent.id})`);
    const qSub = `'${parent.id}' in parents and name = '2026' and mimeType = 'application/vnd.google-apps.folder' and trashed = false`;
    const resSub = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qSub)}&fields=files(id,name)`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const dataSub = await resSub.json();
    if (dataSub.files && dataSub.files.length > 0) {
      targetFolderId = dataSub.files[0].id;
    }
  }

  if (!targetFolderId) {
    console.log('Directly searching for "2026" folder...');
    const q2026 = "name = '2026' and mimeType = 'application/vnd.google-apps.folder' and trashed = false";
    const res2 = await fetch(`https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(q2026)}&fields=files(id,name)`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    const d2 = await res2.json();
    if (d2.files && d2.files.length > 0) {
      targetFolderId = d2.files[0].id;
    }
  }

  if (!targetFolderId) {
    console.error('Target folder 2026 not found.');
    return;
  }

  console.log(`Listing files in target folder (${targetFolderId})...`);
  let allFiles = [];
  let pageToken = null;
  do {
    const pageParam = pageToken ? `&pageToken=${encodeURIComponent(pageToken)}` : '';
    const qFiles = `'${targetFolderId}' in parents and trashed = false`;
    const url = `https://www.googleapis.com/drive/v3/files?q=${encodeURIComponent(qFiles)}&fields=nextPageToken,files(id,name,mimeType,size)&pageSize=100${pageParam}`;
    const res = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    const data = await res.json();
    if (data.files) allFiles = allFiles.concat(data.files);
    pageToken = data.nextPageToken;
  } while (pageToken);

  console.log(`Found ${allFiles.length} files in Google Drive 2026 folder.`);
  let downloadedCount = 0;
  for (const f of allFiles) {
    if (f.mimeType === 'application/vnd.google-apps.folder') continue;
    const downloaded = await downloadFile(accessToken, f.id, f.name, f.size ? parseInt(f.size) : null);
    if (downloaded) downloadedCount++;
  }

  console.log(`Sync complete. Downloaded ${downloadedCount} new/updated files.`);
}

run().catch(console.error);

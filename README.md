# TPS Parser Pro

Everything runs on the phone. No data is sent anywhere.

## Option A (recommended): install as an offline app via GitHub Pages
1. Create a public GitHub repo and upload all files in this folder (index.html, sw.js, manifest.webmanifest, icon-192.png, icon-512.png).
2. Repo Settings > Pages > Deploy from branch > main / root > Save.
3. On the Galaxy A16, open https://YOUR-USERNAME.github.io/REPO-NAME/ in Chrome once while online.
4. Chrome menu (three dots) > Add to Home screen > Install. (Samsung Internet: menu > Add page to > Home screen.)
5. After the header says "Ready offline", it works with Wi-Fi and data off.

To update later: edit files, and change `tps-parser-v1` in sw.js to `v2` so the phone picks up the new version.

## Option B: no hosting at all
Copy only index.html to the phone (USB, Google Drive download, etc.), then open it from My Files with Samsung Internet or Chrome. It works fully offline, but it won't install as an app icon and the Paste button may be blocked (long-press the box to paste instead).

#!/bin/bash
# umutozturk.me'ye yayınla: derle ve dist/'i VDS'e gönder.
# Gerekli: ~/.ssh/config içinde "umutozturk-vds" (anahtar + sabitlenmiş host key).
set -euo pipefail
cd "$(dirname "$0")"
npm run build
# kapabil/indir/kapabil.apk depoda yok, ayrı yüklenir (scripts: Netim'de npm run apk-yayinla); silinmesin
rsync -az --delete --exclude 'm/' --exclude 'kapabil/indir/kapabil.apk' --chmod=D755,F644 dist/ umutozturk-vds:/var/www/umutozturk.me/
curl -s -o /dev/null -w "umutozturk.me -> %{http_code}\n" https://umutozturk.me/

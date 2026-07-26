# Production website

Static production source for `aabhisheksiloya.com`.

## Local verification

```bash
node --check assets/lead-form.mjs
node --test tests/lead-popup.test.mjs
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/`.

## Publication boundary

This repository contains public website assets only. Project strategy, DNS records and internal brand documentation live one directory above in `project/`.

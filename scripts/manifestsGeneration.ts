import path from 'node:path';
import fs from 'node:fs';

import type { WebAppManifest } from 'web-app-manifest';

const PWA_FOLDER = path.resolve('public', 'pwa');
const MANIFESTS_FOLDER = path.resolve(PWA_FOLDER, 'generated-manifests');
const DEFAULT_MANIFEST_PATH = path.resolve(PWA_FOLDER, 'manifest.json');

const manifestContent = JSON.parse(fs.readFileSync(DEFAULT_MANIFEST_PATH, 'utf-8'));
const overrides: Record<
  string,
  Record<string, Partial<WebAppManifest>>
> = manifestContent.__overrides;
delete manifestContent.__overrides;
delete manifestContent.$schema;

const themes = Object.keys(overrides.__theme);
const platforms = Object.keys(overrides.__platform);

themes.forEach((theme) => {
  platforms.forEach((platform) => {
    const manifest = {
      '$ NOTES $': [
        'The file is generated automatically; to update run `npm run generate-manifests`',
        "Don't delete this file anyway! This will break the manifest update for PWA users.",
      ],
      ...manifestContent,
      ...overrides.__theme[theme],
      ...overrides.__platform[platform],
    };
    fs.writeFileSync(
      path.join(MANIFESTS_FOLDER, `manifest-${theme}-${platform}.json`),
      JSON.stringify(manifest, null, 2),
    );
  });
});

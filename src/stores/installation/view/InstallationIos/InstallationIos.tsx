/* eslint-disable max-len */
import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';

import { BottomSheetIos } from '../BottomSheet/BottomSheetIos/BottomSheetIos';

import styles from './InstallationIos.module.css';

// original source: https://github.com/khmyznikov/pwa-install

export const InstallationIos = observer(function InstallationIos() {
  const { manifest, isShowCustomInstallPrompt, hideInstallPrompt } = useStore('installation');

  if (!manifest) {
    return null;
  }

  return (
    <BottomSheetIos isOpen={isShowCustomInstallPrompt} onClose={hideInstallPrompt}>
      <div className={styles.root}>
        <div className={styles.icon}>
          <img src={manifest.icons?.[0].src} alt="icon" className={styles.iconImage} />
        </div>
        <div className={styles.about}>
          <div className={styles.name}>{manifest.name}</div>
          <div className={styles.description}>{manifest.description}</div>
        </div>
        <div className={styles.howToInstruction}>
          <div className={styles.instructionStep}>
            <div className={styles.svgWrap}>
              <svg className={styles.svgSafari} viewBox="0 0 13.96 13.96" width="24" height="24">
                <path d="M6.98 0A6.99 6.99 0 0 0 0 6.98a6.99 6.99 0 0 0 6.98 6.98 6.99 6.99 0 0 0 6.98-6.98A6.99 6.99 0 0 0 6.98 0zm0 1.07a5.9 5.9 0 0 1 5.91 5.91 5.9 5.9 0 0 1-5.9 5.91 5.9 5.9 0 0 1-5.92-5.9 5.9 5.9 0 0 1 5.91-5.92zm3.76 2.15L5.6 5.62l-2.38 5.12L8.4 8.4zM6.96 6.3a.8.8 0 1 1 0 1.59.8.8 0 0 1 0-1.6z" />
              </svg>
            </div>
            <div className={styles.stepText}>Открыть в браузере Safari</div>
          </div>
          <div className={styles.instructionStep}>
            <div className={styles.svgWrap}>
              <svg className={styles.svgShare} width="25" height="32">
                <path d="M12.51 20.76c.52 0 1-.43 1-.95V4.94l-.1-2.08 1.12 1.16L16.8 6.4c.18.2.43.3.69.3a.88.88 0 0 0 .61-1.53L13.23.43c-.25-.25-.47-.32-.72-.32s-.47.07-.72.32L6.9 5.17a.87.87 0 0 0-.28.65c0 .5.38.88.9.88.23 0 .5-.1.68-.3l2.27-2.38 1.12-1.17-.07 2.09V19.8c0 .52.45.95 1 .95zM4.38 31.73h16.23c2.86 0 4.3-1.43 4.3-4.24V13.2c0-2.8-1.44-4.23-4.3-4.23h-3.97v2h3.93c1.48 0 2.34.79 2.34 2.34v14.06c0 1.55-.86 2.34-2.34 2.34H4.42c-1.5 0-2.33-.79-2.33-2.34V13.32c0-1.55.83-2.34 2.33-2.34h3.96v-2h-4C1.53 8.98.1 10.4.1 13.2V27.5c0 2.81 1.44 4.24 4.3 4.24z" />
              </svg>
            </div>
            <div className={styles.stepText}>Нажать «Поделиться»</div>
          </div>
          <div className={styles.instructionStep}>
            <div className={styles.svgWrap}>
              <svg className={styles.svgAdd} width="25" height="25">
                <path d="M23.4 1.6C22.08.29 20.21.05 17.8.05H7.17c-2.34 0-4.2.24-5.53 1.57C.3 2.95.06 4.78.06 7.1V17.7c0 2.4.23 4.25 1.55 5.58 1.34 1.32 3.2 1.57 5.6 1.57h10.6c2.4 0 4.27-.25 5.6-1.57 1.32-1.34 1.55-3.17 1.55-5.58V7.19c0-2.4-.23-4.26-1.56-5.58zm-.38 5.22v11.25c0 1.51-.2 2.94-1.03 3.78-.83.84-2.3 1.06-3.82 1.06H6.84c-1.51 0-2.96-.22-3.8-1.06C2.2 21 2 19.58 2 18.07V6.87c0-1.55.2-3.01 1.02-3.85.84-.84 2.32-1.05 3.87-1.05h11.28c1.52 0 2.99.23 3.82 1.07.82.82 1.03 2.26 1.03 3.78zM12.5 18.9c.65 0 1.03-.43 1.03-1.13v-4.34h4.53c.67 0 1.14-.37 1.14-1 0-.64-.44-1.02-1.14-1.02h-4.53V6.87c0-.7-.38-1.13-1.03-1.13-.63 0-1 .45-1 1.13v4.54H7c-.7 0-1.16.38-1.16 1.02 0 .63.49 1 1.15 1h4.52v4.34c0 .66.36 1.13 1 1.13z" />
              </svg>
            </div>
            <div className={styles.stepText}>Нажать «На экран «Домой»</div>
          </div>
        </div>
      </div>
    </BottomSheetIos>
  );
});

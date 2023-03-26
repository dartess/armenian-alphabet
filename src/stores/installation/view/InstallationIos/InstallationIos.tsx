import React from 'react';
import { observer } from 'mobx-react-lite';

import { useStore } from '@/core/stores';

import { BottomSheetIos } from '../BottomSheet/BottomSheetIos/BottomSheetIos';

import { ReactComponent as SafariIcon } from './Safari.svg';
import { ReactComponent as ShareIcon } from './Share.svg';
import { ReactComponent as AddIcon } from './Add.svg';
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
              <SafariIcon className={styles.svgSafari} />
            </div>
            <div className={styles.stepText}>Открыть в браузере Safari</div>
          </div>
          <div className={styles.instructionStep}>
            <div className={styles.svgWrap}>
              <ShareIcon className={styles.svgShare} />
            </div>
            <div className={styles.stepText}>Нажать «Поделиться»</div>
          </div>
          <div className={styles.instructionStep}>
            <div className={styles.svgWrap}>
              <AddIcon className={styles.svgAdd} />
            </div>
            <div className={styles.stepText}>Нажать «На экран «Домой»</div>
          </div>
        </div>
      </div>
    </BottomSheetIos>
  );
});

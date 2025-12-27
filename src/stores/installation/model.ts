export type InstallationStoreImplementation = {
  canBeInstalled: boolean;
  showInstallPrompt: () => void;
  hideInstallPrompt?: () => void;
  isShowCustomInstallPrompt?: boolean;
};

export type InstallationImplementationKind = 'native' | 'iOS';

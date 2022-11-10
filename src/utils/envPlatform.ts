export type Platform = 'macOS' | 'iOS' | 'Windows' | 'Android' | 'Linux';

function getPlatform(): Platform | undefined {
  const { userAgent, platform } = navigator;
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K'];
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE'];
  const iosPlatforms = ['iPhone', 'iPad', 'iPod'];
  if (macosPlatforms.includes(platform)) {
    return navigator.maxTouchPoints > 2
      ? 'iOS' // workaround: Safari on some iPad mimics the desktop Safari.
      : 'macOS';
  }
  if (iosPlatforms.includes(platform)) {
    return 'iOS'; // it's also an iPadOS
  }
  if (windowsPlatforms.includes(platform)) {
    return 'Windows';
  }
  if (userAgent.includes('Android')) {
    return 'Android';
  }
  if (platform.includes('Linux')) {
    return 'Linux';
  }
}

export const PLATFORM_ENV = getPlatform();

export const IS_IOS = PLATFORM_ENV === 'iOS';
export const IS_ANDROID = PLATFORM_ENV === 'Android';

export const IS_OS_MOBILE = IS_IOS || IS_ANDROID;

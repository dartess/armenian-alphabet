function vhFix(fixedTest: HTMLElement, vhTest: HTMLElement, timeout: number): void {
  setTimeout(() => {
    document.documentElement.insertBefore(fixedTest, document.documentElement.firstChild);
    document.documentElement.insertBefore(vhTest, document.documentElement.firstChild);
    const offset = vhTest.offsetHeight - fixedTest.offsetHeight;
    document.documentElement.removeChild(fixedTest);
    document.documentElement.removeChild(vhTest);
    document.documentElement.style.setProperty('--vh-gap', `${offset}px`);
  }, timeout);
}

/**
 * Добавляет в html пользовательское свойство --vh-gap, которое помогает использовать на
 * iOS высоту в 100vh через конструкцию
 * @supports (--var: 0) { height: calc(100vh - var(--vh-gap)); }
 */
export function fixIOsVh(): void {
  document.documentElement.style.setProperty('--vh-gap', '0px');

  const fixedTest = document.createElement('div');
  fixedTest.style.cssText = 'position: fixed; top: 0; bottom: 0;';
  const vhTest = document.createElement('div');
  vhTest.style.cssText = 'position: fixed; top: 0; height: 100vh';

  const vhFixTimeout = vhFix.bind(null, fixedTest, vhTest, 0);
  const vhFixTimeoutFast = vhFix.bind(null, fixedTest, vhTest, 100);
  const vhFixTimeoutLong = vhFix.bind(null, fixedTest, vhTest, 500);

  vhFixTimeout();
  window.addEventListener('load', vhFixTimeoutFast);
  window.addEventListener('scroll', vhFixTimeoutFast);
  window.addEventListener('resize', vhFixTimeoutFast);
  window.addEventListener('orientationchange', vhFixTimeoutLong);
}

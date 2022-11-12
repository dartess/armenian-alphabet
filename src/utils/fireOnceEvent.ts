import { safeLocalStorage } from '@/utils/safeLocalStorage';

type EventName = string;

type EventCallback = () => void;

export function fireOnceEvent(eventName: EventName, eventCallback: EventCallback) {
  const storageId = `OES#${eventName}`;
  const wasFired = safeLocalStorage.getItem(storageId);
  if (wasFired) {
    return;
  }
  eventCallback();
  safeLocalStorage.setItem(storageId, '1');
}

import { useCallback, useEffect, useSyncExternalStore } from 'react'

export default function useLocalStorage(key: string, initialValue: any) {
  const store = useSyncExternalStore(
    useLocalStorageSubscribe,
    () => getLocalStorageItem(key),
    () => JSON.stringify(initialValue)
  )

  const setState = useCallback(
    (v: (arg: any) => any) => {
      try {
        // @ts-ignore JSON.parse a null value
        const nextState = typeof v === 'function' ? v(JSON.parse(store)) : v

        if (nextState === undefined || nextState === null) {
          removeLocalStorageItem(key)
        } else {
          setLocalStorageItem(key, nextState)
        }
      } catch (e) {
        console.warn(e)
      }
    },
    [key, store]
  )

  useEffect(() => {
    if (
      getLocalStorageItem(key) === null &&
      typeof initialValue !== 'undefined'
    ) {
      setLocalStorageItem(key, initialValue)
    }
  }, [key, initialValue])

  return [store ? JSON.parse(store) : initialValue, setState]
}

const setLocalStorageItem = (key: string, value: any) => {
  const stringifiedValue = JSON.stringify(value)
  window.localStorage.setItem(key, stringifiedValue)
  dispatchStorageEvent(key, stringifiedValue)
}

const removeLocalStorageItem = (key: string) => {
  window.localStorage.removeItem(key)
  dispatchStorageEvent(key, null)
}

const getLocalStorageItem = (key: string) => {
  return window.localStorage.getItem(key)
}

const useLocalStorageSubscribe = (callback: () => void) => {
  window.addEventListener('storage', callback)
  return () => window.removeEventListener('storage', callback)
}

function dispatchStorageEvent(key: string, newValue: any) {
  window.dispatchEvent(new StorageEvent('storage', { key, newValue }))
}

import useLocalStorage from './useLocalStorage'

export default function useChain() {
  return useLocalStorage('chain', 'Ethereum')
}

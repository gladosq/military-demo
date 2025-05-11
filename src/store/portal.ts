import {create} from 'zustand';

export const phrases = [
  ['Знаешь ли ты, что людей с нечистой совестью..', '..легче напугать громкими звуками?'],
  // ['Ты прекрасно выглядишь.', 'Для человека.'],
  // ['Вечная тьма и забвение?', 'Нужно было делать бэкап.'],
  // ['Интуиция?', 'А может недостаток данных?'],
];

interface PortalState {
  routingPage?: string;
  setRoutingPage: (value: string) => void;
  interacted: boolean;
  setInteracted: (value: boolean) => void;
}

const usePortalStore = create<PortalState>((set) => ({
  routingPage: undefined,
  interacted: false,
  setRoutingPage: (value) => set(() => ({routingPage: value})),
  setInteracted: (value) => set(() => ({interacted: value})),
}));

export default usePortalStore;

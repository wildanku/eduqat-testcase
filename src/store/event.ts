import { create } from "zustand";
import { EventType } from "../types/event";

type Store = {
  event: EventType | null;
  setEvent: (event: EventType) => void;
};

export const useEvent = create<Store>()((set) => ({
  event: null,
  setEvent: (event: EventType) =>
    set((state) => ({
      event: event,
    })),
}));

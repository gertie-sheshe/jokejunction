import { create, StateCreator } from "zustand";

export interface UserState {
  user: null | string;
}

export interface UserActions {
  setUser: (user: null | string) => void;
}

const userStore: StateCreator<UserState & UserActions> = (set) => ({
  user: null,
  setUser: (user) => set({ user }),
});

const useUserStore = create(userStore);

export default useUserStore;

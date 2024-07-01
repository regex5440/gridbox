import { create } from "zustand";
import { getAuthenticUserGeneralInfo } from "actions/auth";

type State = {
  user: {
    id: string;
    firstName: string;
    lastName: string | null;
    email: string;
    gender: string | null;
    dob: Date | null;
  } | null;
  loading: boolean;
};

type Action = {
  fetchUser: () => Promise<void>;
  removeUser: () => void;
};

const useUserStore = create<State & Action>((set) => ({
  user: null,
  loading: false,
  fetchUser: async () => {
    set({ loading: true });
    const user = await getAuthenticUserGeneralInfo();
    set({ user: user.data, loading: false });
  },
  removeUser: () => set({ user: null }),
}));

export default useUserStore;

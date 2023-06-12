import useUserStore, { UserActions } from "@jokejunction/store/userStore";

interface UserState {
  user: null | string;
  setUser: UserActions["setUser"];
}

const useUser = (): UserState => {
  const user = useUserStore((state) => state.user);
  const setUser = useUserStore((state) => state.setUser);

  return { user, setUser };
};

export default useUser;

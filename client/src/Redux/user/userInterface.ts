export interface UserInterface {
  isAuthenticated: boolean;
  userId: number | null;
  userEmail: string | null;
  token: string | null;

  // @TODO move to separate interface
  userStorages: Array<string>;

  // @TODO move to separate interface
  userAddressesStorages: Array<string>;

  errorMassage: string | null;
  loginError: string | null;
}

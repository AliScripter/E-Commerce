`use strict`;

export const useAuth = () => {
  const authUser = useState(`auth`, () => null);

  return { authUser };
};

import { useSelector } from 'react-redux';

export default function useAuthUser() {
  const { authUser, error: authUserError } = useSelector((states) => states.authUser);
  return { authUser, authUserError };
}

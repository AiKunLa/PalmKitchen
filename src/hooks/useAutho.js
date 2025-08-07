import { useNavigate } from "react-router-dom";

export const useAutho = () => {
  const { account } = useAccountStore();
  const navigate = useNavigate();
  navigate('/login');
  
};

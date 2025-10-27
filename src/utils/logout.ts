import Cookies from 'js-cookie';
import { logout } from '../redux/authSlice';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleLogout = (dispatch: any) => {
    Cookies.remove('authToken');
    Cookies.remove('refreshToken');
    dispatch(logout());
    window.location.href = '/';
};

export default handleLogout;

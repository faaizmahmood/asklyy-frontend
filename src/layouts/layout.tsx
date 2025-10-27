import Cookies from "js-cookie";
import ProtectedLayout from "./protectedLayout";
import UnProtectedLayout from "./unProtectedLayout";


const Layout = () => {

    const token = Cookies.get('authToken')

    return (
        <>
            {
                token ? <ProtectedLayout /> : <UnProtectedLayout />
            }
        </>
    )
}

export default Layout
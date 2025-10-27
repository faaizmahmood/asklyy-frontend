import { NavLink } from "react-router-dom";


const Header = () => {
    return (
        <header className="container-fluid py-2 border-bottom">
            <div className="d-flex justify-content-between align-items-center">
                <div className="fs-4 fw-bold " style={{ color: 'var(--primary-color)' }}>Asklyy</div>
                <nav className="d-flex gap-3">

                    <NavLink to='/auth/signin'> <button className="btn-outlined">Sign In</button></NavLink>
                    <NavLink to='/auth/signup'> <button className="btn-filled">Sign Up</button></NavLink>

                </nav>
            </div>
        </header>
    );
};

export default Header;

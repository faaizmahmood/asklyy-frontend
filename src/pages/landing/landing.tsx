import { NavLink } from 'react-router-dom';
import styles from './landing.module.scss';

const LandingPage = () => {
    return (
        <main className={`container-fluid d-flex align-items-center justify-content-center ${styles.landingPage}`}>
            <div className="text-center">
                <h1 className={`mb-3 fw-bold ${styles.heading}`}>
                    Welcome to Asklyy
                </h1>

                <p className={`mb-4 ${styles.subheading}`}>
                    Create a chatbot in minutes — add it to your website or connect it to Telegram (coming soon).
                </p>

                <div className="d-flex justify-content-center gap-3">
                    <NavLink to="/auth/signup">
                        <button className="btn-filled px-4">Get Started Free</button>
                    </NavLink>
                    <NavLink to="/auth/signin">
                        <button className="btn-outlined px-4">Sign In</button>
                    </NavLink>
                </div>

                <p className="mt-4 text-muted" style={{ fontSize: '0.9rem' }}>
                    No coding needed — just create, customize, and paste the embed code.
                </p>
            </div>
        </main>
    );
};

export default LandingPage;

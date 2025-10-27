import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './loader.module.scss';

const Loader = () => {

    const location = useLocation();

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);

        // simulate loading delay, you can remove this in production
        const timeout = setTimeout(() => {
            setLoading(false);
        }, 500); // Adjust this delay based on needs

        return () => clearTimeout(timeout);
    }, [location]);

    return loading ? (
        <div className={styles.loaderOverlay}>
            <div className={styles.spinner}></div>
        </div>
    ) : null;
};

export default Loader;

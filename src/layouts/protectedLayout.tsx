import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import styles from './layout.module.scss';
import AppRoutes from '../routes/appRoutes';
import handleLogout from '../utils/logout';
import { useDispatch } from 'react-redux';
import Breadcrumbs from '../components/breadcrumbs/breadcrumbs';
import NProgress from '../utils/nprogressConfig';
import { LuLogOut } from "react-icons/lu";
import { MdOutlineSettings } from "react-icons/md";
// import { BiSupport } from "react-icons/bi";
import { HiMiniBars3BottomLeft } from "react-icons/hi2";
// import { CgProfile } from "react-icons/cg";
// import { MdOutlineDashboard } from "react-icons/md";
import EmailVerificationBanner from '../components/emailVerificationBanner/emailVerificationBanner';
import { TbMessageChatbot } from "react-icons/tb";


const ProtectedLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [toggled, setToggled] = useState(false);
    const [mobileView, setMobileView] = useState(window.innerWidth <= 768);

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    useEffect(() => {
        NProgress.start();
        const timer = setTimeout(() => NProgress.done(), 500);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    useEffect(() => {
        const handleResize = () => {
            const isMobile = window.innerWidth <= 768;
            setMobileView(isMobile);
            if (!isMobile) setToggled(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isActive = (path: string) => location.pathname === path;

    const topMenu = [
        // { label: 'Dashboard', icon: MdOutlineDashboard, path: '/dashboard' },
        { label: 'Chatbots', icon: TbMessageChatbot, path: '/chatbots' },
        // { label: 'Profile', icon: CgProfile, path: '/profile' },
    ];

    const bottomMenu = [
        { label: 'Settings', icon: MdOutlineSettings, path: '/settings' },
        // { label: 'Support', icon: BiSupport, path: '/support' },
    ];

    return (
        <div className={styles.layout}>
            {mobileView && (
                <button className={styles.mobileToggle} onClick={() => setToggled(!toggled)}>
                    <HiMiniBars3BottomLeft size={24} />
                </button>
            )}

            <Sidebar
                collapsed={collapsed}
                toggled={toggled}
                breakPoint="md"
                backgroundColor="white"
                className={styles.sidebar}
            >
                <Menu menuItemStyles={{
                    button: ({ active }) => ({
                        backgroundColor: active ? 'var(--bg-color)' : 'transparent',
                        color: active ? '#1A1E34' : 'var(--primary-color)',
                        fontWeight: active ? 700 : 400,
                        fontSize: '16px',
                        borderRadius: '8px',
                        transition: '0.2s ease',
                    }),
                }}>

                    {/* ✅ WRAP EVERYTHING IN FLEX CONTAINER */}
                    <div className={styles.sidebarWrapper}>

                        {/* ✅ Header / Collapse Toggle */}
                        <MenuItem
                            className={styles.menuHeader}
                            icon={<HiMiniBars3BottomLeft size={24} />}
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <span>Asklyy</span>
                        </MenuItem>

                        {/* ✅ Top Section */}
                        <div className={styles.topSection}>
                            {topMenu.map(item => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <MenuItem
                                        key={item.path}
                                        icon={<Icon size={active ? 22 : 20} />}
                                        active={active}
                                        onClick={() => navigate(item.path)}
                                        className={`${styles.menuItem} ${collapsed ? styles.compact : ''}`}
                                    >
                                        {item.label}
                                    </MenuItem>
                                );
                            })}
                        </div>

                        {/* ✅ Bottom Section (Now Truly at Bottom) */}
                        <div className={styles.bottomSection}>
                            {bottomMenu.map(item => {
                                const Icon = item.icon;
                                const active = isActive(item.path);
                                return (
                                    <MenuItem
                                        key={item.label}
                                        icon={<Icon size={20} />}
                                        active={active}
                                        onClick={() => navigate(item.path)}
                                        className={`${styles.menuItem} ${collapsed ? styles.compact : ''}`}
                                    >
                                        {item.label}
                                    </MenuItem>
                                );
                            })}
                            <MenuItem
                                icon={<LuLogOut size={20} />}
                                onClick={() => handleLogout(dispatch)}
                                className={`${styles.menuItem} ${collapsed ? styles.compact : ''}`}
                            >
                                <span>Logout</span>
                            </MenuItem>
                        </div>

                    </div>
                </Menu>
            </Sidebar>

            <main className={styles.main}>
                <EmailVerificationBanner />
                <Breadcrumbs />
                <AppRoutes />
            </main>
        </div>
    );
};

export default ProtectedLayout;

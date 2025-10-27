import { Link, useLocation } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { useSelector } from "react-redux";
import styles from "./breadcrumbs.module.scss";

// Static routes
const routes = [
    { path: "/dashboard", breadcrumb: "Dashboard" },
    { path: "/stock", breadcrumb: "Stock" },
    { path: "/repair", breadcrumb: "Repair" },
    { path: "/verify-email/:token", breadcrumb: "email verification" },
];


const Breadcrumbs = () => {
    const breadcrumbs = useBreadcrumbs(routes);
    const location = useLocation();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = useSelector((state: any) => state.user?.profile?.name);

    const currentPath = location.pathname;

    // Detect dynamic title
    const pageTitle = breadcrumbs[breadcrumbs.length - 1]?.breadcrumb || "Page";


    const greeting =
        currentPath === "/dashboard" && user
            ? `Hi ${user.split(" ")[0]}, welcome back 👋`
            : pageTitle;

    return (
        <>
            <nav className={`${styles.breadcrumbs} mb-3`}>
                <ul className="flex items-center text-sm text-slate-500 space-x-1">
                    {breadcrumbs.map(({ match, breadcrumb }, index) => (
                        <li key={match.pathname} className="flex items-center">
                            {index > 0 && <span className="mx-2 text-slate-400">/</span>}

                            <Link
                                to={match.pathname}
                                className={`capitalize hover:text-blue-500 transition-colors ${currentPath === match.pathname
                                        ? "text-slate-800 font-semibold"
                                        : ""
                                    }`}
                            >
                                {breadcrumb}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <h3 className="text-xl font-semibold text-slate-700">{greeting}</h3>
        </>
    );
};

export default Breadcrumbs;

import { useLayoutContext } from "../../../context/layoutContext";
import { useApiContext } from "../../../context/apiContext";
import { Link, useNavigate } from "react-router-dom";
import { FormButton } from "../forms/Fields";
import { LoginPopup } from "../popups/LoginPopup";

import cn from "classnames";
import styles from "./Layout.module.scss";
import logo from "../../../images/logo.svg";

type Props = {
    requiresAuthentication?: boolean;
    children: React.ReactNode;
}

export const Layout = ({ children, requiresAuthentication }: Props) => {
    const layout = useLayoutContext();
    const { userRole, isConnected, username, setApiKey, setIsConnected, setUsername } = useApiContext();
    const navigate = useNavigate();

    return (
        <main>
            <nav className={styles.header}>
                <div className={styles.logoContainer} onClick={() => navigate('/')}>
                    <img src={logo} alt="logoIcon" />
                    <div className={styles.logoTextContainer}>
                        <p className={styles.title}>NSI</p>
                        <p className={styles.subTitle}>National Statistics Institute</p>
                    </div>
                </div>
                <div className={styles.linkSection}>
                    <ul className={styles.navLinks}>
                        <li className={cn({ [styles.selected]: layout.currentPage == "studies" })}>
                            <Link to="/publications" onClick={() => layout.setCurrentPage("studies")}>
                                <span className={styles.linkName}>Publications</span>
                            </Link>
                        </li>
                        <li className={cn({ [styles.selected]: layout.currentPage == "lab" })}>
                            <Link to="/lab" onClick={() => layout.setCurrentPage("lab")}>
                                <span className={styles.linkName}>Lab</span>
                            </Link>
                        </li>
                        <li>
                            {isConnected ?
                                <Link className={styles.username} to="/dashboard">
                                    <span>{username}</span>
                                </Link>
                                :
                                <a className={styles.loginContainer} onClick={() => layout.setLoginPopupActive(true)}>
                                    <span className={styles.login}>Log In</span>
                                </a>
                            }
                        </li>
                    </ul>
                </div>
            </nav>


            <div className={styles.mainContent}>
                {requiresAuthentication && !isConnected &&
                    <div className={styles.authRequired}>
                        <h2>Connection required</h2>
                        <p>You must be connected in order to access this content</p>

                        <div className={styles.actions}>
                            <FormButton className={styles.loginBtn} name="loginBtn" onClick={() => layout.setLoginPopupActive(true)}>Login</FormButton>
                        </div>
                    </div>
                }
                {(!requiresAuthentication || (requiresAuthentication && isConnected)) && children}

                {layout.isLoginPopupActive && <LoginPopup />}
            </div>

            <div className={styles.footer}>
                <p>National Statistics Institute - Bandit Network - All rights reserved</p>
            </div>
        </main>
    )

}
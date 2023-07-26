import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import styles from "./LoginPopup.module.scss";
import cn from "classnames";
import { useLayoutContext } from "../../../context/layoutContext";
import AuthApi from "../../../api/nsi/authApi";
import { useApiContext } from "../../../context/apiContext";
import { useState } from "react";
import { ErrorText, FormButton, PasswordInput, TextInput } from "../forms/Fields";

export const LoginPopup = () => {
    const { setLoginPopupActive } = useLayoutContext();
    const [mail, setMail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const { setApiKey, setUsername, setIsConnected, setUserRole } = useApiContext();

    const handleLogin = () => {
        AuthApi.authenticateAsync({ mail, password }).then((response) => {
            setApiKey(response.data.token);
            setUsername(response.data.mail);
            setLoginPopupActive(false);
            setIsConnected(true);
            setUserRole(response.data.role as any)
        }).catch((error) => {
            if (error.response.status = 403) {
                setErrorMessage("Invalid credentials");
            }
        })
    }

    return (
        <div className={styles.popup}>
            <div className={cn(styles.main, styles.popupFrame)}>
                <div className={styles.topControls}>
                    <FontAwesomeIcon className={styles.closeIcon} icon={faTimes} onClick={() => setLoginPopupActive(false)} />
                </div>
                <div className={styles.popupMainContent}>
                    <h1>Log in</h1>
                    <form onSubmit={handleLogin}>
                        <TextInput name="Email" onChange={setMail} />
                        <PasswordInput name="Password" onChange={setPassword} />
                        <ErrorText text={errorMessage} />
                        <FormButton name="loginBtn" onClick={handleLogin}>Login</FormButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
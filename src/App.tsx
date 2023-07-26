import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { setAppLanguage } from "./i18n";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/pages/Home";
import styles from "./App.module.scss";
import { ContextProviders } from "./context";
import { Editor } from "./components/pages/Editor";
import { Publication } from "./components/pages/Publication";
import { Lab } from "./components/pages/Lab";
import { Review } from "./components/pages/Review";
import { Publications } from "./components/pages/Publications";

const queryClient = new QueryClient();

function setLanguage() {
    const lan = localStorage.getItem("languagePreference") ?? window.navigator.language;
    setAppLanguage(lan);
}

function App() {

    useEffect(() => {
        setLanguage();
        document.documentElement.style.setProperty('--primary', process.env.REACT_APP_DASHBOARD_COLOR ?? "#FFFFFF");
    }, []);

    return (
        <div className={styles.app}>
            <ContextProviders storageKey={"bandit-nsi"}>
                <QueryClientProvider client={queryClient}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/editor" element={<Editor />} />
                            <Route path="/lab" element={<Lab />} />
                            <Route path="/publication/:id" element={<Publication />} />
                            <Route path="/review/:id" element={<Review />} />
                            <Route path="/publications" element={<Publications />} />
                        </Routes>
                    </BrowserRouter>
                </QueryClientProvider>
            </ContextProviders>
        </div>
    );
}

export default App;

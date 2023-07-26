import moment from "moment";
import { usePendingPublications } from "../../api/query/publicationsQueries";
import { Layout } from "../common/layouts/Layout"

import styles from './Lab.module.scss'
import { FormButton } from "../common/forms/Fields";
import { useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

export const Lab = () => {

    const { data: publications } = usePendingPublications();
    const navigate = useNavigate();

    return (
        <Layout requiresAuthentication>
            <div className={styles.main}>
                <div className={styles.mainContainer}>
                    <h1>Pending publications</h1>
                    <div className={styles.publicationsContainer}>
                        {publications?.map(p => (
                            <div className={styles.publication} onClick={() => navigate(`/review/${p.id}`)}>
                                <p><span className={styles.title}>{p.title}</span><span className={styles.metadata}>Created by {p.authorName} the {moment(p.date).format("DD/MM/YYYY")}</span></p>
                                <FontAwesomeIcon className={styles.eye} icon={faEye} />
                            </div>
                        ))}
                    </div>
                    <FormButton className={styles.addBtn} name="addBtn" onClick={() => navigate("/editor")}>Add</FormButton>
                </div>
            </div>
        </Layout>
    )
}
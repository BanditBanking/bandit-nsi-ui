import { useParams } from "react-router";
import { Layout } from "../common/layouts/Layout";
import MDEditor from '@uiw/react-md-editor';

import styles from "./Publication.module.scss";
import moment from "moment";
import { usePublishedPublication } from "../../api/query/publicationsQueries";

export const Publication = () => {
    const { id } = useParams();
    const { data: publication } = usePublishedPublication(id)

    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.studyContainer}>
                    <h1>{publication?.title}</h1>
                    <p>{publication?.description}</p>
                    <div className={styles.tags}>
                        {publication?.tags?.map(tag => <div className={styles.tag}><span>{tag}</span></div>)}
                    </div>

                    <div className={styles.mdContainer} data-color-mode="light">
                        <MDEditor.Markdown source={publication?.content} />
                    </div>

                    <p>Posted by {publication?.authorName} the {moment(publication?.date).format('MM/DD/YYYY')}</p>

                </div>
            </div>
        </Layout>
    )
}
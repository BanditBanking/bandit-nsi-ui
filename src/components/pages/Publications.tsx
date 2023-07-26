import { usePublishedPublications } from "../../api/query/publicationsQueries"
import { StatCard } from "../common/cards/StatCard";
import { TextInput } from "../common/forms/Fields";
import { Layout } from "../common/layouts/Layout";

import styles from "./Publications.module.scss";

export const Publications = () => {

    const { data: publications } = usePublishedPublications();
    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.publicationsContainer}>
                    {publications?.map(card => <StatCard
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        tags={card.tags}
                        date={card.date}
                    />)}
                </div>
            </div>
        </Layout>
    )
}
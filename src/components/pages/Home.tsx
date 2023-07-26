import styles from "./Home.module.scss";
import { Layout } from "../common/layouts/Layout";
import { StatCard } from "../common/cards/StatCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useLastPublications } from "../../api/query/publicationsQueries";
import { useNavigate } from "react-router";

export const Home = () => {

    const { data: studies } = useLastPublications();

    const navigate = useNavigate();

    return (
        <Layout>
            <div className={styles.heroBanner}>
                <div className={styles.tagLineContainer}>
                    <h1 className={styles.tagLine}>Drive innovation where it has never been</h1>
                    <h2 className={styles.subTagLine}>Enhance your data with super powers</h2>
                </div>
                <div className={styles.barsContainer}>
                    <img className={styles.bars} src="bars.svg" alt="bars" />
                </div>
            </div>
            <div className={styles.main}>
                <div className={styles.cardTitleContainer}>
                    <h3>Our latest studies</h3>
                    <div className={styles.seeMoreContainer} onClick={() => navigate("/publications")}>
                        <span>See more</span>
                        <FontAwesomeIcon className={styles.icon} icon={faArrowRight} />
                    </div>
                </div>
                <div className={styles.cardsContainer}>
                    {studies?.map(card => <StatCard
                        id={card.id}
                        title={card.title}
                        description={card.description}
                        tags={card.tags}
                        date={card.date}
                    />)}
                </div>
            </div>
        </Layout>
    );
};

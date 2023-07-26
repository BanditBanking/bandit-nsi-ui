import { useNavigate } from "react-router";
import { StudySummaryDTO } from "../../../api/nsi/publicationApi";
import styles from "./StatCard.module.scss";
import moment from "moment";

export const StatCard = ({ id, title, description, tags, date }: StudySummaryDTO) => {

    const navigate = useNavigate();

    return (
        <div className={styles.cardContainer} onClick={() => navigate(`/publication/${id}`)}>
            <h4>{title}</h4>
            <p>{description}</p>
            <div className={styles.footer}>
                <div className={styles.tags}>
                    {tags?.map(tag => <div className={styles.tag}><span>{tag}</span></div>)}
                </div>
                <span className={styles.date}>{moment(date).format('MM/DD/YYYY')}</span>
            </div>
        </div>
    )
}
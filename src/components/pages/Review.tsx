import { useNavigate, useParams } from "react-router";
import { Layout } from "../common/layouts/Layout";
import MDEditor from '@uiw/react-md-editor';
import { usePendingPublication } from "../../api/query/publicationsQueries";
import { useEffect, useState } from "react";
import PublicationApi from "../../api/nsi/publicationApi";
import { useApiContext } from "../../context/apiContext";
import { FormButton } from "../common/forms/Fields";

import styles from "./Review.module.scss";
import moment from "moment";
import cn from "classnames"
import { StudyApi } from "../../api/nsi";

export const Review = () => {
    const { id } = useParams();
    const { data: publication } = usePendingPublication(id);

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [tags, setTags] = useState<string>();
    const [md, setMd] = useState<string | undefined>();

    const [comment, setComment] = useState<string>("");

    const { apiKey, userRole } = useApiContext();

    const navigate = useNavigate();

    useEffect(() => {
        publication?.title && setTitle(publication?.title);
        publication?.description && setDescription(publication?.description);
        publication?.tags && setTags(publication?.tags?.join(","));
        publication?.content && setMd(publication?.content);
    }, [publication])

    const sendComment = () => {
        if (comment !== "") {
            PublicationApi.commentAsync({ studyId: id, content: comment }, apiKey).then((response) => {
                window.location.reload();
            }).catch((error) => {
                console.log(error);
            })
        }
    }

    const handleUpdate = () => {
        const tagsArray = tags?.split(",").map((str) => str.trim()).filter((str) => str !== "");
        StudyApi.updateAsync({ studyId: id, title, description, tags: tagsArray, content: md }, apiKey).then((response) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    const handlePublish = () => {
        StudyApi.publishAsync(id, apiKey).then((response) => {
            navigate(`/publication/${id}`)
        }).catch((error) => {
            console.log(error);
        })
    }

    if (userRole === "User") {
        return (<h1>Unauthorized content</h1>)
    }

    return (
        <Layout requiresAuthentication>
            <div className={styles.main}>
                <div className={styles.studyContainer}>
                    <textarea
                        className={styles.titleInput}
                        id="title-input"
                        placeholder="Title"
                        onChange={(v) => setTitle(v.target.value)}
                        value={title}
                    />
                    <textarea
                        className={styles.desciptionInput}
                        id="description-input"
                        placeholder="Description"
                        onChange={(v) => setDescription(v.target.value)}
                        value={description}
                    />
                    <input
                        className={styles.tagsInput}
                        type="text"
                        id="tags-input"
                        placeholder="Tags"
                        onChange={(v) => setTags(v.target.value)}
                        value={tags}
                    />
                    <div className={styles.mdContainer} data-color-mode="light">
                        <MDEditor height={500} value={md} onChange={setMd} />
                    </div>
                    <p>Posted by {publication?.authorName} the {moment(publication?.date).format('MM/DD/YYYY')}</p>

                    <div className={styles.controls}>
                        <FormButton className={styles.control} name="updateBtn" onClick={handleUpdate}>Update</FormButton>
                        <FormButton className={cn(styles.control, { [styles.locked]: (userRole !== "ChiefDataScientist" && userRole !== "Admin") })} name="publishBtn" onClick={handlePublish}>Publish</FormButton>
                    </div>

                    <div className={styles.commentSection}>
                        <h2>Comments</h2>
                        {
                            publication?.comments?.map(c => (
                                <div className={styles.comment}>
                                    <p className={styles.commentHeader}><span className={styles.username}>{c.authorName}</span><span className={styles.date}>{moment(c.date).format("DD/MM/YYYY HH:mm:ss")}</span></p>
                                    <p>{c.content}</p>
                                </div>
                            ))
                        }
                        <form className={styles.commentForm}>
                            <textarea
                                className={styles.commentInput}
                                id="comment-input"
                                placeholder="Comment"
                                onChange={(v) => setComment(v.target.value)}
                                value={comment}
                            />
                            <div className={styles.controls}>
                                <button type="button" className={styles.commentBtn} onClick={sendComment}>Comment</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
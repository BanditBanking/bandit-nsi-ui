import { useState } from "react";
import { Layout } from "../common/layouts/Layout"
import MDEditor from "@uiw/react-md-editor";

import styles from "./Editor.module.scss";
import StudyApi from "../../api/nsi/publicationApi";
import { useApiContext } from "../../context/apiContext";
import { useNavigate } from "react-router";


export const Editor = () => {

    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [tags, setTags] = useState<string>("");
    const [md, setMd] = useState<string>();

    const { apiKey } = useApiContext();

    const navigate = useNavigate();

    const handleSubmit = () => {
        const tagsArray = tags.split(",").map((str) => str.trim()).filter((str) => str !== "");
        StudyApi.createAsync({ title, description, tags: tagsArray, content: md }, apiKey).then((response) => {
            navigate("/lab")
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <Layout>
            <div className={styles.main}>
                <div className={styles.editor}>
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

                    <div className={styles.mdEditor} data-color-mode="light">
                        <MDEditor height={400} value={md} onChange={setMd} />
                    </div>

                    <div className={styles.controlSection}>
                        <button onClick={handleSubmit}>Submit</button>
                    </div>

                </div>
            </div>
        </Layout>
    )
}
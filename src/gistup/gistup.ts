import {Visibility} from "./visibility";
import {File} from "./file";
import axios from "axios";

const GITHUB_GIST_URL = "https://api.github.com/gists";
const X_GITHUB_API_VERSION = "2022-11-28";
export namespace gistup {
    export async function uploadFiles(
        title: string,
        files: File[],
        visibility: Visibility,
        token: string
    ): Promise<axios.AxiosResponse<any, any>> {
        return await axios.post(
            GITHUB_GIST_URL,
            {
                description: title,
                public: Visibility.Public === visibility ? true : false,
                files: Object.fromEntries(files.map(file => [file.name, {content: file.content}])),
            },
            {
                headers: {
                    Accept: "application/vnd.github+json",
                    Authorization: `Bearer ${token}`,
                    "X-GitHub-Api-Version": X_GITHUB_API_VERSION,
                },
            }
        );
    }
}

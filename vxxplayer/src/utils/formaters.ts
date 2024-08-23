import { apiUrl } from "./url";

export const getThumbnailUrl = (name: string) => {
    const fname = name.replace(".webm", ".jpg");
    return `${apiUrl}/thumb/${fname}`;
};
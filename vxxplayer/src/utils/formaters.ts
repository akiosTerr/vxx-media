export const getThumbnailUrl = (name: string) => {
    const fname = name.replace(".webm", ".jpg");
    return `http://localhost:3001/thumb/${fname}`;
};
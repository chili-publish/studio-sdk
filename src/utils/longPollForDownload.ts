export const longPollForDownload = async (url: string): Promise<true | unknown> => {
    try {
        const response = await fetch(url)
            .then((data) => data)
            .catch((err) => err);
        if (response?.status === 202) {
            await new Promise((resolve) => setTimeout(resolve, 5000));
            return await longPollForDownload(url);
        } else {
            return true;
        }
    } catch (err) {
        return err;
    }
};

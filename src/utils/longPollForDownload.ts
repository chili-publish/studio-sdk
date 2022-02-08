export const longPollForDownload = async (url: string) => {
    let result;
    try {
        const response = await fetch(url)
            .then((data) => data)
            .catch((err) => {
                result = err;
                return err;
            });
        if (response.status === 202) {
            setTimeout(() => {
                longPollForDownload(url);
            }, 500);
        }
        result = true;
    } catch (err) {
        result = err;
    }
    return result;
};

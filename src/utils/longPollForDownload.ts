export const longPollForDownload = async (url:string) =>        
    fetch(url)
        .then((res) => {
            console.log('hehehehhhe')
            if (res.status === 202) {
                return setTimeout(() => {
                    longPollForDownload(url);
                }, 1000);
            }
            console.log(res, 'HERE A REAL RESPONSEE...');
            return true;
        })
        .catch((err) => {
           console.log(`Error while downloading the file:${err}`);
           return err;
            
        });
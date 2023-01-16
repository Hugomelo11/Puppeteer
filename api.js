// example of creating an external post request that can be transfered and called multiple places

async function gotoExtended(page, request) {
    const { url, method, headers, postData } = request;

    if (method !== 'GET' || postData || headers) {
        let wasCalled = false;
        await page.setRequestInterception(true);
        const interceptRequestHandler = async (request) => {
            try {
                if (wasCalled) {
                    return await request.continue();
                }

                wasCalled = true;
                const requestParams = {};

                if (method !== 'GET') requestParams.method = method;
                if (postData) requestParams.postData = postData;
                if (headers) requestParams.headers = headers;
                await request.continue(requestParams);
                await page.setRequestInterception(false);
            } catch (error) {
                log.debug('Error while request interception', { error });
            }
        };

        await page.on('request', interceptRequestHandler);
    }

    return page.goto(url);
}
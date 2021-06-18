const Apify = require('apify');

Apify.main(async () => {
    // Create a RequestList
    const requestList = await Apify.openRequestList('start-urls', [
        { url: 'https://36kr.com/p/1273193910037634' },
        { url: 'https://36kr.com/p/1273041915079813' },
        { url: 'https://36kr.com/p/1273170937802114' },
    ]);
    // Function called for each URL
    const handlePageFunction = async ({ request, page }) => {
        const title = await page.title();
        console.log(`URL: ${request.url}\nTITLE: ${title}`);
    };
    // Create a PuppeteerCrawler
    const crawler = new Apify.PuppeteerCrawler({
        requestList,
        handlePageFunction,
    });
    // Run the crawler
    await crawler.run();
});
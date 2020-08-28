const timeout = 15000;

describe("Sign in and out with valid Credentials", () => {
    let page;

    test('sign in', async () => {
        await page.setViewport({
            width: 1920,
            height: 1080,
        });
        const username = 'Louis';
        const pwd = 'CK';
        await page.goto('http://polr.alwaysdata.net');
        await page.waitForSelector('#navbar > li.dropdown > a');
        await page.$eval( '#navbar > li.dropdown > a', el => el.click() );
        await page.screenshot({path: './tests/img/displaySignIn.png'});
        await page.type('#dropdown > form > input:nth-child(1)', username);
        await page.type('#dropdown > form > input:nth-child(2)', pwd);
        // await page.$eval( '#dropdown > form > input:nth-child(1)', el => el.value=' ' );
        //await page.$eval( '#dropdown > form > input:nth-child(2)', el => el.value=' ' );
        await page.screenshot({path: './tests/img/signInCredentials.png'});
        await page.$eval( '#dropdown > form > input.btn.btn-success.form-control.login-form-submit', el => el.click() );
        const html = await page.$eval('#navbar > div > li > a', e => e.innerHTML);
        expect(html).toContain(username);
        await page.screenshot({path: './tests/img/signedIn.png'});
    }, timeout);

    test('log out', async () => {
        await page.goto('http://polr.alwaysdata.net');
        await page.waitForSelector('#navbar > div > li > a');
        await page.$eval( '#navbar > div > li > a', el => el.click() );
        await page.screenshot({path: './tests/img/displayLogOut.png'});
        await page.$eval('#navbar > div > li > ul > li:nth-child(3) > a', el => el.click());
        const html = await page.$eval('#navbar > li.dropdown > a', e => e.innerHTML);
        expect(html).toContain("Sign In");
        await page.screenshot({path: './tests/img/loggedOut.png'});
    }, timeout);

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

});

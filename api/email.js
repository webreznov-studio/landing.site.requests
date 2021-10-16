const PORT = process.env.PORT || 8080;

const {nanoid} = require('nanoid');
const {Client} = require('pg');

/********** Api ***********/

/** POST /api/email/add-user-contact */
console.log(`##email http://localhost:${PORT}/api/email/add`);
exports.toAddUserContact = (req, res) => {
    const {siteType, siteExsistUrl, clientName, email, contacts, exampleSitesUrls, functionOfSite, designSite, regionAudit, auditorsSite} = req.body;
    console.log('$$$', siteType);
    console.log('$$$', clientName);
    console.log('$$$', email);

    const client = new Client({
        connectionString: process.env.POSTGRES_URI,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    client.connect();

    client.query(
        `INSERT INTO public.wr_requests (id, create_date, site_type, site_exsist_url, client_name, email, example_sites_urls, function_of_site, design_site, region_audit, auditors_site, another_contacts) VALUES('${nanoid(8)}', '${Date.now()}', '${siteType}', '${siteExsistUrl}', '${clientName}', '${email}', '${exampleSitesUrls}', '${functionOfSite}', '${designSite}', '${regionAudit}', '${auditorsSite}', '${contacts}');`,
        (errorDb, resultDb) => {
            if (errorDb) {
                console.log(errorDb);
                client.end();
                return res.sendStatus(500);
            }
            for (let row of resultDb.rows) {
                console.log('#+#+#+#+', JSON.stringify(row));
            }
            client.end();
            return res.send('OK!');
        },
    );
};

/** GET /api/email/read-user-contact */
console.log(`##email http://localhost:${PORT}/api/email/read-user-contact`);
exports.toReadUserContact = (req, res) => {
    res.sendStatus(200)
};

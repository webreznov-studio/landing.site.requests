const PORT = process.env.PORT || 8080;
const fs = require('fs');
const {nanoid} = require('nanoid');
const {Client} = require('pg');

/********** Api ***********/

const client = new Client({
    connectionString: process.env.POSTGRES_URI,
    ssl: {
        rejectUnauthorized: false,
    },
});

/** POST /api/email/add-user-contact */
console.log(`##email http://localhost:${PORT}/api/email/add`);
exports.toAddUserContact = (req, res) => {
    console.log('!!!!!', req);
    client.connect();

    client.query(
        `INSERT INTO public.wr_requests
        (id, create_date, site_type, site_exsist_url, client_name, email, example_sites_urls, function_of_site, design_site, region_audit, auditors_site, another_contacts)
        VALUES(${nanoid()}, ${Date.now()}, ${req.query.siteType}, ${req.query.siteExsistUrl}, ${req.query.clientName}, ${req.query.email}, ${req.query.exampleSitesUrls}, ${req.query.functionOfSite}, ${req.query.designSite}, ${req.query.regionAudit}, ${req.query.auditorsSite}, ${req.query.anotherContacts});
        `,
        (err, res) => {
            if (err) throw err;
            for (let row of res.rows) {
                console.log('#+#+#+#+#+#+#+#+#+#+#', JSON.stringify(row));
            }
            client.end();
        },
    );
};

/** GET /api/email/read-user-contact */
console.log(`##email http://localhost:${PORT}/api/email/read-user-contact`);
exports.toReadUserContact = (req, res) => {};

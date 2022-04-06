const PORT = process.env.PORT || 8080;

const { nanoid } = require('nanoid');
const { Client } = require('pg');

/********** Api ***********/

/** GET /api/portfolio/all */
console.log(`##portfolio http://localhost:${PORT}/api/portfolio/all`);
exports.getPortfolioAll = (req, res) => {
    const client = new Client({
        connectionString: process.env.POSTGRES_URI,
        ssl: {
            rejectUnauthorized: false,
        },
    });

    client.connect();

    client.query(
        `SELECT * FROM public.wr_portfolio`,
        (errorDb, resultDb) => {
            if (errorDb) {
                console.log(errorDb);
                client.end();
                return res.sendStatus(500);
            }
            const mapData = resultDb.rows.map((i) => ({
                id: i.id,
                projectName: i.project_name,
                description: i.description,
                tools: i.tools,
                images: i.images,
                links: i.links,
            }));
            
            res.send(mapData);
            client.end();
            return;
        },
    );
    return;
}

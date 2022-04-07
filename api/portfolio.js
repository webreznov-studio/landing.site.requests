const PORT = process.env.PORT || 8080;
const GET_HOST = process.env.GET_HOST || 'http://localhost';

const { nanoid } = require('nanoid');
const { Client } = require('pg');

const connectDB = function () {
    return new Client({
        connectionString: process.env.POSTGRES_URI,
        ssl: {
            rejectUnauthorized: false,
        },
    });
}

/********** Api ***********/

/** GET /api/portfolio/all */
console.log(`##portfolio http://localhost:${PORT}/api/portfolio/all`);
exports.getPortfolioAll = (req, res) => {
    const client = connectDB();

    client.connect();

    client.query(
        `SELECT * FROM public.wr_portfolio`,
        (errorDb, resultDb) => {
            if (errorDb) {
                console.log(errorDb);
                client.end();
                return res.sendStatus(400).json({auth: false, message: 'Ошибка:('});
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

/** POST /api/portfolio/add-new-project */
console.log(`##portfolio ${GET_HOST}:${PORT}/api/portfolio/add-new-project`);
exports.toAddNewProject = (req, res) => {
    const {
        projectName,  
        description, 
        tools,
        images,
        links,
    } = req.body;
    
    const client = connectDB();

    client.connect();

    client.query(
        `INSERT INTO public.wr_portfolio (id, project_name, description, tools, images, links) 
        VALUES('${nanoid(8)}', '${projectName}', '${description}', '${tools}', '${images}', '${links}');`,
        (errorDb) => {
            if (errorDb) {
                console.log(errorDb);
                client.end();
                return res.sendStatus(400).json({auth: false, message: 'Ошибка:('});
            }
            res.sendStatus(200);
            client.end();
        },
    );
    return;
};
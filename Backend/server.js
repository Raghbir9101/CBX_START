import express from 'express';
const app = express();
import cors from 'cors';
const port = process.env.PORT || 80;

import { connection } from './db.js';
import UsersRouter from './Controllers/UserController.js';
import PagesRouter from './Controllers/PageController.js';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const _dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.json({ limit: '50mb' }));
app.use(express.static('../FrontEnd/dist'));
app.use(cors({ origin: "*" }));


app.use("/api", UsersRouter);
app.use("/api", PagesRouter);



app.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
})
app.get("/login", (req, res) => {
    res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
})
app.get("/page/:pageID", (req, res) => {
    res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
})
// app.get("/client/:path/:path1/:path2", (req, res) => {
//     res.sendFile(path.join(_dirname, "../FrontEnd", "dist", "index.html"));
// })





import axios from 'axios';
import cheerio from "cheerio"
import urlModule from "url"
import UsersModel from './Models/UsersModel.js';
import { v4 as uid } from 'uuid';


async function extractWebsiteData(url) {
    try {
        const { data } = await axios.get(url);

        const $ = cheerio.load(data);

        // Extract title
        const title = $('title').text().trim() || null;

        // Extract favicon from link tags
        let favicon = null;
        const faviconLinkTypes = ['link[rel="shortcut icon"]', 'link[rel="icon"]', 'link[rel="apple-touch-icon"]'];
        for (let type of faviconLinkTypes) {
            const faviconHref = $(type).attr('href');
            if (faviconHref) {
                favicon = normalizeUrl(faviconHref, url);
                break;
            }
        }

        // Check meta tags for favicon
        if (!favicon) {
            const metaTags = $('meta[itemprop="image"]').attr('content');
            if (metaTags) {
                favicon = normalizeUrl(metaTags, url);
            }
        }
        // Extract description
        let description = null;
        const descriptionMetaTags = [
            'meta[name="description"]',
            'meta[property="og:description"]',
            'meta[name="twitter:description"]'
        ];
        for (let tag of descriptionMetaTags) {
            const desc = $(tag).attr('content');
            if (desc) {
                description = desc;
                break;
            }
        }
        console.log(favicon)
        try {
            let browkenLinkCheck = await fetch(favicon)
            if (!browkenLinkCheck.ok || favicon == "") {
                favicon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&size=30px`
            }
        } catch (error) {
            favicon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&size=30px`
        }
        return { name: title, favicon, description };
    } catch (error) {
        console.error('Error extracting website data:', error.message);
        return ({ name: url, favicon: `https://s2.googleusercontent.com/s2/favicons?domain=${url}&size=30px`, description: url });
    }
}

function normalizeUrl(urlString, baseUrl) {
    try {
        const urlObject = new URL(urlString, baseUrl);
        return urlObject.href;
    } catch (error) {
        console.error('Error normalizing URL:', error);
        return null;
    }
}

app.post("/api/getSiteData", async (req, res) => {
    console.log(req.body.url);
    let data = await extractWebsiteData(req.body.url || "")
    return res.send(data)
})



import { OAuth2Client } from "google-auth-library";

const CLIENT_ID = `57117822909-4h5v6n8j2fgi0f82ng99pjuegksr4n4e.apps.googleusercontent.com`
const CLIENT_SECRET = `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`
// const REDIRECT_URI = `https://cbx-start.onrender.com`
const REDIRECT_URI = process.env.HOST_URL || `http://localhost:5173`


const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const secret = 'password';
import jwt from 'jsonwebtoken';
import PagesModel from './Models/PagesModel.js';
import { authenticateToken, authenticateTokenAndReturnUser } from './Authorization/AuthenticateToken.js';



// app.get("/api/getUserData", authenticateToken, async (req, res) => {
//     const ownedPages = await PagesModel.find({ userID: req.user._id },)
//     const colaboratedPages = await PagesModel.find({ "collaborators.email": req.user.email })
//     return res.send({ ...req.user, pages })
// })

// app.get("/api/getUserData", authenticateToken, async (req, res) => {
//     try {
//         // Find pages owned by the user
//         const ownedPages = await PagesModel.find({ userID: req.user._id });

//         // Find pages where the user is a collaborator
//         const collaboratedPages = await PagesModel.find({ "collaborators.email": req.user.email });

//         // Add role key to collaborated pages
//         const collaboratedPagesWithRole = collaboratedPages.map(page => {
//             const collaborator = page.collaborators.find(c => c.email === req.user.email);
//             return {
//                 ...page.toObject(),
//                 role: collaborator.role
//             };
//         });

//         // Combine owned and collaborated pages
//         const pages = [
//             ...ownedPages.map(page => ({
//                 ...page.toObject(),
//                 role: 'OWNER' // Assuming the role for owned pages is 'OWNER'
//             })),
//             ...collaboratedPagesWithRole
//         ];

//         // Send response
//         return res.send({ ...req.user, pages });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).send("Internal Server Error");
//     }
// });


app.get("/api/getUserData", authenticateToken, async (req, res) => {
    try {
        // Find pages owned by the user
        const ownedPages = await PagesModel.find({ userID: req.user._id });

        // Find pages where the user is a collaborator
        const collaboratedPages = await PagesModel.find({ "collaborators.email": req.user.email });

        // Add role key to collaborated pages
        const collaboratedPagesWithRole = collaboratedPages.map(page => {
            const collaborator = page.collaborators.find(c => c.email === req.user.email);
            return {
                ...page.toObject(),
                role: collaborator.role
            };
        });

        // Create a map to track unique pages
        const pagesMap = new Map();

        // Add owned pages to the map
        ownedPages.forEach(page => {
            pagesMap.set(page._id.toString(), {
                ...page.toObject(),
                role: 'OWNER' // Assuming the role for owned pages is 'OWNER'
            });
        });

        // Add collaborated pages to the map, only if they don't already exist
        collaboratedPagesWithRole.forEach(page => {
            if (!pagesMap.has(page._id.toString())) {
                pagesMap.set(page._id.toString(), page);
            }
        });

        // Convert map to array
        const pages = Array.from(pagesMap.values());

        // Send response
        return res.send({ ...req.user, pages });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Internal Server Error");
    }
});



app.get("/api/getPageData/:pageID", authenticateTokenAndReturnUser, async (req, res) => {
    let page = await PagesModel.findOne({ _id: req.params.pageID }).lean();
    let role = "NONE";
    if (req?.user?._id == page?.userID) {
        role = "OWNER";
    }
    if (page.visibility == "PUBLIC") {
        return res.send({ ...page, role })
    }
    if (!req.login && page.visibility == "PRIVATE") {
        return res.send({ error: "This page is PRIVATE !", errorCode: "PRIVATE_PAGE" })
    }
    if (page.visibility == "PASSWORD_PROTECTED") {
        if (page.password == req.query.password) {
            return res.send({ ...page, role })
        }
        else if (page.password != req.query.password && req.query.password) {
            return res.send({ error: "Incorrect Password.", errorCode: "INVALID_PASSWORD" })
        }
        return res.send({ error: "Please enter password", errorCode: "ENTER_PASSWORD" })
    }
    else if (req.login && page.visibility == "PRIVATE") {
        for (let i of page.collaborators) {
            if (req.user._id == page.userID) {
                role = "OWNER";
                break
            }
            if (i.email == req.user.email) {
                role = i.role;
                break
            }
        }

        page = { ...page, role }
    }

    if ((req.login && req.user._id == page.userID) || role != "NONE") {
        return res.send({ ...page, role })
    }

    if (page.visibility == "PRIVATE") {
        return res.send({ error: "This Page is private. Cannot access without permission.", errorCode: "PRIVATE_PAGE" })
    }

    return res.send({ ...page, role })
})



app.get('/auth/google', (req, res) => {
    const authUrl = client.generateAuthUrl({
        access_type: 'offline',
        prompt: 'consent',  // This ensures that a new refresh token is issued
        scope: ['email', 'profile'] // Add any additional scopes you need
    });
    res.redirect(authUrl);
});


app.post('/api/auth/google/login', async (req, res) => {
    const { email } = req.body;

    try {
        // let { data: slmRes } = await axios.get(`https://auth.ceoitbox.com/checkauth/CBXSHEETOWA/${email}/dwf/NA/NA`);
        // if (slmRes.valid != "Active") return res.send({ error: "Unfortunately you are not authorised to access this app. Please connect with CEOITBOX team at access@ceoitbox.in." })

        const existingUser = await UsersModel.findOne({ email }).lean();
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, secret);
            delete existingUser.password;
            delete existingUser.googleRefreshToken;
            delete existingUser.OTP;
            return res.send({
                body: existingUser,
                token
            })
        }
        return res.send({
            error: "User does not exist"
        })
    } catch (error) {
        console.error('Error retrieving access token:', error.message);
        res.status(500).send('Error retrieving access token');
    }
});


app.get('/auth/google/callback', async (req, res) => {
    const code = req.query.code;
    try {
        const { tokens } = await client.getToken(code);

        // Use tokens.access_token for accessing Google APIs on behalf of the user
        const { email } = await client.getTokenInfo(tokens.access_token);

        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID, // Specify your app's client ID
        });
        const payload = ticket.getPayload();

        const userEmail = payload.email;
        const userName = payload.name;
        const photo = payload.picture;
        const existingUser = await UsersModel.findOne({ email }).lean();
        if (existingUser) {
            let updatedUser = await UsersModel.findOneAndUpdate({ email }, {
                googleRefreshToken: tokens.refresh_token,
                photo
                // role: "ADMIN"
            });
            // const pages = await PagesModel.find({ userID: existingUser._id })

            const ownedPages = await PagesModel.find({ userID: existingUser._id });

            // Find pages where the user is a collaborator
            const collaboratedPages = await PagesModel.find({ "collaborators.email": existingUser.email });

            // Add role key to collaborated pages
            const collaboratedPagesWithRole = collaboratedPages.map(page => {
                const collaborator = page.collaborators.find(c => c.email === existingUser.email);
                return {
                    ...page.toObject(),
                    role: collaborator.role
                };
            });

            // Create a map to track unique pages
            const pagesMap = new Map();

            // Add owned pages to the map
            ownedPages.forEach(page => {
                pagesMap.set(page._id.toString(), {
                    ...page.toObject(),
                    role: 'OWNER' // Assuming the role for owned pages is 'OWNER'
                });
            });

            // Add collaborated pages to the map, only if they don't already exist
            collaboratedPagesWithRole.forEach(page => {
                if (!pagesMap.has(page._id.toString())) {
                    pagesMap.set(page._id.toString(), page);
                }
            });

            // Convert map to array
            const pages = Array.from(pagesMap.values());


            const token = jwt.sign({ userId: existingUser._id }, secret);
            delete existingUser.password;
            delete existingUser.googleRefreshToken;
            delete existingUser.OTP;
            return res.send({
                body: { ...existingUser, pages: pages },
                token
            })
        }
        else {
            let newUser = await UsersModel.create({
                email: userEmail,
                userName,
                password: userEmail,
                isAdmin: false,
                googleRefreshToken: tokens.refresh_token,
                photo
            })
            newUser = JSON.parse(JSON.stringify(newUser))
            let pages = await PagesModel.create({
                data: [
                    {
                        items: [

                        ]
                    },
                    {
                        items: [
                        ]
                    },
                    {
                        items: [

                        ]
                    },
                    {
                        items: [

                        ]
                    },
                    {
                        items: [

                        ]
                    },
                ],
                userID: newUser._id,
                visibility: "PRIVATE",
                isPasswordProtected: false,
                password: "",
                pageName: "New Page"
            })
            pages = JSON.parse(JSON.stringify(pages));
            pages = { ...pages, role: "OWNER" }

            const token = jwt.sign({ userId: newUser._id }, secret);
            delete newUser.password;
            delete newUser.googleRefreshToken;
            delete newUser.OTP;
            return res.send({
                body: { ...newUser, pages: [pages] },
                token
            })
        }
    } catch (error) {
        console.error('Error retrieving access token:', error);
        res.status(500).send('Error retrieving access token');
    }
});


















app.listen(port, async () => {
    try {
        await connection
        console.log("Connected to db")
    } catch (err) {
        console.log(err)
    }
    console.log("Server Started at PORT", port)
})
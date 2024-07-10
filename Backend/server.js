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
        try {
            let browkenLinkCheck = await fetch(imageUrl)
            if (!browkenLinkCheck.ok) {
                favicon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&size=30px`
            }
        } catch (error) {
            favicon = `https://s2.googleusercontent.com/s2/favicons?domain=${url}&size=30px`
        }
        return { name: title, favicon, description };
    } catch (error) {
        console.error('Error extracting website data:', error.message);
        return ({ name: url, favicon: "", description: url });
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
const REDIRECT_URI = `http://localhost:5173`


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

    if (page.visibility == "PUBLIC") {
        return res.send(page)
    }
    if (!req.login && page.visibility == "PRIVATE") {
        return res.send({ error: "This page is PRIVATE !", errorCode: "PRIVATE_PAGE" })
    }
    if (page.visibility == "PASSWORD_PROTECTED") {
        if (page.password == req.query.password) {
            return res.send(page)
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
        return res.send(page)
    }

    if (page.visibility == "PRIVATE") {
        return res.send({ error: "This Page is private. Cannot access without permission.", errorCode: "PRIVATE_PAGE" })
    }

    return res.send(page)
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
        console.log(tokens)
        // Use tokens.access_token for accessing Google APIs on behalf of the user
        const { email } = await client.getTokenInfo(tokens.access_token);
        const ticket = await client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID, // Specify your app's client ID
        });
        const payload = ticket.getPayload();
        const userEmail = payload.email;
        const userName = payload.name;
        const existingUser = await UsersModel.findOne({ email }).lean();
        if (existingUser) {
            let updatedUser = await UsersModel.findOneAndUpdate({ email }, {
                googleRefreshToken: tokens.refresh_token,
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
            })
            newUser = JSON.parse(JSON.stringify(newUser))
            let pages = await PagesModel.create({
                data: [
                    {
                        items: [
                            {
                                type: "Calculator", data: {

                                }
                            },
                        ]
                    },
                    {
                        items: [

                            {
                                type: "Clock", data: {

                                }
                            },
                            {
                                type: "Note", data: {
                                    name: "Test Note",
                                    html: `<ol><li><strong>Task 1</strong></li><li><em>Task 2</em></li><li><u>Task 3</u></li><li><strong><em><u>Task 4</u></em></strong></li></ol><p>Hi</p>`
                                }
                            },

                        ]
                    },
                    {
                        items: [
                            {
                                type: "Bookmark", data: {
                                    name: "My Links",
                                    URLs: [
                                        {
                                            "_id": "8d5b3b5f-acc1-41c0-8f84-560c16e4303c",
                                            "link": "https://google.com",
                                            "name": "Google",
                                            "favicon": "https://www.google.com/favicon.ico"
                                        },
                                        {
                                            "_id": "307faaaf-f35f-436c-b1f9-8c56810406ad",
                                            "link": "https://youtube.com",
                                            "name": "YouTube",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://youtube.com&size=30px",
                                            "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube."
                                        },
                                        {
                                            "_id": "33303410-fac8-4ed7-bf14-0b97ec669291",
                                            "link": "https://fb.com",
                                            "name": "ফেইচবুক - লগ ইন কৰক বা ছাইন আপ কৰক",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://fb.com&size=30px",
                                            "description": "আপোনাৰ বন্ধু, পৰিয়ালবৰ্গ আৰু আপুনি জনা লোকসকলৰ সৈতে ভাগ বতৰা আৰু সংযোগৰ আৰম্ভণি কৰিবলৈ ফেইচবুকত লগ ইন কৰক।"
                                        },
                                        {
                                            "_id": "c78af177-8c77-4b91-b2b9-6b25b3039352",
                                            "link": "https://instagram.com",
                                            "name": "Instagram",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://instagram.com&size=30px",
                                            "description": "Create an account or log in to Instagram - Share what you're into with the people who get you."
                                        },
                                        {
                                            "_id": "1991b892-95ed-47d3-b55f-bce307d97ef3",
                                            "link": "https://honeygain.com/",
                                            "name": "Passive Income - Effortlessly | Honeygain",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://honeygain.com/&size=30px",
                                            "description": "Honeygain is the first-ever app that allows users to make money online by sharing their internet connection."
                                        },
                                        {
                                            "_id": "00f6204f-c99f-4081-8a4f-7647164d5868",
                                            "link": "https://www.soraai.onl/",
                                            "name": "Sora AI Video Generator - OpenAI Text to Video",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://www.soraai.onl/&size=30px",
                                            "description": "Sora AI by OpenAI - Login to Generate Videos from Text effortlessly. Revolutionize content creation across industries with AI technology."
                                        },
                                        {
                                            "_id": "889491f9-a787-41f5-abcc-ef7cc2026fc5",
                                            "link": "https://gemini.google.com",
                                            "name": "‎Gemini - chat to supercharge your ideas",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://gemini.google.com&size=30px",
                                            "description": "Bard is now Gemini. Get help with writing, planning, learning, and more from Google AI."
                                        },
                                        {
                                            "_id": "f6cdcc35-452d-475d-a1cd-2c741a997161",
                                            "link": "https://play.google.com",
                                            "name": "Android Apps on Google Play",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://play.google.com&size=30px",
                                            "description": "Enjoy millions of the latest Android apps, games, music, movies, TV, books, magazines & more. Anytime, anywhere, across your devices."
                                        },
                                        {
                                            "_id": "4d39748b-f91d-4aa2-b0f1-e62056b0dfe7",
                                            "link": "https://data.ceoitbox.com",
                                            "name": "Sheet To WebApp",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://data.ceoitbox.com&size=30px",
                                            "description": "description"
                                        },
                                        {
                                            "_id": "b1d824b4-24b3-46f1-82b9-77e542e441aa",
                                            "link": "https://meet.ceoitbox.com",
                                            "name": "CBXMEET",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://meet.ceoitbox.com&size=30px",
                                            "description": "Web site created using create-react-app"
                                        },
                                        {
                                            "_id": "24318ce2-ea22-4399-911d-d93ac3cb0831",
                                            "link": "https://auth.ceoitbox.com",
                                            "name": "SLM",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://auth.ceoitbox.com&size=30px",
                                            "description": "Web site created using create-react-app"
                                        },
                                        {
                                            "_id": "4fe3eac7-4b1b-463f-9184-0fa22122f713",
                                            "link": "https://test.ceoitbox.com",
                                            "name": "Mcq Form",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://test.ceoitbox.com&size=30px",
                                            "description": "Web site created using create-react-app"
                                        },
                                        {
                                            "_id": "df3c1bf9-a66e-4f79-812f-9b98f92e0abd",
                                            "link": "https://onelink.ceoitbox.com",
                                            "name": "OneLink",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://onelink.ceoitbox.com&size=30px",
                                            "description": null
                                        },
                                        {
                                            "_id": "6b4ddcaf-a195-4dc9-bd0c-1db3a333e850",
                                            "link": "https://cbxtree.in/",
                                            "name": "CBXTREE",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://cbxtree.in/&size=30px",
                                            "description": "Web site build by CEOITBOX"
                                        },
                                        {
                                            "_id": "36796c11-c4a8-4a5b-b485-f8ae2b5607a4",
                                            "link": "https://help.ceoitbox.com",
                                            "name": "CEOITBOX | Helpdesk",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://help.ceoitbox.com&size=30px",
                                            "description": "Web site build by CEOITBOX"
                                        },
                                        {
                                            "_id": "ddf16cbb-ea3c-4671-8658-8275aabdfe8a",
                                            "link": "https://cbxit.in",
                                            "name": "CBXIT",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://cbxit.in&size=30px",
                                            "description": "Web site created using create-react-app"
                                        },
                                        {
                                            "_id": "df1a4070-5f18-4288-8391-fd270847697f",
                                            "link": "https://lms.ceoitbox.com",
                                            "name": "CEOITBOX",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://lms.ceoitbox.com&size=30px",
                                            "description": null
                                        },
                                        {
                                            "_id": "333e69e6-9ab2-499b-80a2-cd22c39d99f1",
                                            "link": "https://warranty.boat-lifestyle.com/",
                                            "name": "boAt Support",
                                            "favicon": "https://s2.googleusercontent.com/s2/favicons?domain=https://warranty.boat-lifestyle.com/&size=30px",
                                            "description": null
                                        }
                                    ]
                                }
                            },
                            {
                                type: "Currency Converter", data: {

                                }
                            },
                        ]
                    },
                    {
                        items: [
                            {
                                type: "Embed", data: {
                                    name: "Song",
                                    url: "https://www.youtube.com/embed/gMQv5i3wQeQ?si=FknaJFqpuHA2dzbR"
                                }
                            },
                            {
                                type: "Embed", data: {
                                    name: "Google Calander",
                                    url: "https://calendar.google.com/calendar/embed?src=raghbir%40ceoitbox.in&ctz=Asia%2FKolkata"
                                }
                            },
                        ]
                    },
                    {
                        items: [
                            {
                                type: "Todo", data: {
                                    name: "My Todo List",
                                    tasks: [
                                        {
                                            _id: uid(),
                                            task: "Work on Laptop",
                                            completed: false
                                        },
                                        {
                                            _id: uid(),
                                            task: "Work on Mobile",
                                            completed: true
                                        }
                                    ]
                                }
                            },
                        ]
                    },
                ],
                userID: newUser._id,
                visibility: "PRIVATE",
                isPasswordProtected: false,
                password: "",
                pageName: "New Page"
            })
            pages = JSON.parse(JSON.stringify(pages))
            console.log(pages)
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
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method == "POST") {
        return await login(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}

async function login(req, res) {
    const body = req.body;
    const email = body.email;
    const password = body.password;


    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
                password: password,
            },
        });


        if (user && user.password === password) {
            return res.status(200).json(user, { success: true });
        } else {
            return res.status(500).json({ error: error.message });
        }
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}

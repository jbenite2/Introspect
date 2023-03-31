import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method == "POST") {
        return await addUser(req, res);
    } else if (req.method === "GET") {
        return await listUser(req, res);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}

async function listUser(req, res) {
    const body = req.body;
    try {
        const user = await prisma.user.findMany();
        return res.status(200).json(user, { success: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}

async function addUser(req, res) {
    const body = req.body;
    try {
        const newEntry = await prisma.user.create({
            data: {
                email: body.email,
                firstName: body.firstName,
                lastName: body.lastName,
                password: body.password,
                phone: body.phone,
            },
        });
        return res.status(200).json(newEntry, { success: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}

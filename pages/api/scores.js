import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function addScores(req, res) {
    const body = req.body;
    const email = body.email;
    const schools = body.schools;

    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email
            },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await prisma.user.update({
            where: {
                email: email
            },
            data: {
                schools: {
                    schools
                }
            }
        });

        return res.status(200).json(updatedUser, { success: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}

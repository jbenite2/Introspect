import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function addScores(req, res) {
    const body = req.body;
    const email = body.email;
    const scores = body.schools;

    console.log('Made it inside')

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
                scores: {
                    set: scores //scores is not being set because of a type mismatch between strings[] and varchar4096 in prisma
                }
            }
        });

        return res.status(200).json(updatedUser, { success: true });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ error: error.message });
    }
}

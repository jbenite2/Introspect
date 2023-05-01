// Backend code
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

export default async function userSurveyData(req, res) {
  const { email } = req.query;

  try {
    const data = await prisma.User.findFirst({ where: { email } });
    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(data);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
}

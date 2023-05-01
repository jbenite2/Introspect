// Frontend code
const userEmail = sessionStorage.getItem("userEmail");

// Make a request to the backend API endpoint
const response = await fetch(`/api/userSurveyData?email=${userEmail}`);

// Backend code
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function userSurveyData(req, res) {
    const { email } = req.query;
    try {
      const data = await prisma.table_name.findMany({ where: { email } });
      return res.status(200).json(data);
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({ error: error.message });
    }
}

import prisma from "../utils/api"

const getAll = async () => {
    const candidate = await prisma.candidate.findMany()

    return candidate;   
}

export default getAll;
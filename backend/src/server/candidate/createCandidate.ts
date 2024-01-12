import { Candidate } from "@prisma/client";
import prisma from "../utils/api"

const create = async (data: Candidate) => {
    const serializedSkills = JSON.stringify(data.skills);

    const candidate = await prisma.candidate.create({
        data: {
            name: data.name,
            skills: serializedSkills
        },
    });
    return candidate;
}

export default create;

import prisma from "../utils/api";

const getSearch = async () => {
  const candidates = await prisma.candidate.findMany();

  const validCandidates = candidates.map(candidate => {
    let skillsArray: string[] = [];

    // Check if the skills property is stored as a string
    if (typeof candidate.skills === 'string') {
      try {
        skillsArray = JSON.parse(candidate.skills);
      } catch (error) {
        // Handle the error (e.g., log it)
        console.error('Error parsing skills:', error);
      }
    } else if (Array.isArray(candidate.skills)) {
      // Check if the skills property is already an array
      skillsArray = candidate.skills;
    }

    return {
      id: candidate.id,
      name: candidate.name,
      skills: skillsArray
    };
  });

  return validCandidates;
};

export default getSearch;


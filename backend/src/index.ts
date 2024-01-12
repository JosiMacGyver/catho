import getAll from "./server/candidate/getCandidate";
import getSearch from "./server/candidate/getSearch";
import create from "./server/candidate/createCandidate";
import fastify from "./server/utils/server";
import fastifyCors from '@fastify/cors'


fastify.register(fastifyCors, {
    origin: "http://localhost:3002",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
});


fastify.get('/candidate', async function handler() {
    const candidate = await getAll();
    return candidate;
})

fastify.post('/candidate', async function handler(request, reply) {
    const data = request.body as Candidate;

    const candidate = await create(data);
    return candidate;
})

interface Candidate {
    id: string;
    name: string;
    skills: string[];

}

fastify.get('/candidate/search', async function handler(request, reply) {
    try {
        const { skills } = request.query as { skills: string };

        if (!skills || skills.trim() === '') {
            reply.code(400).send({ error: 'Erro. Nenhum parâmetro foi informado' });
            return;
        }

        const skillsArray = skills.split(',').map(skill => skill.trim().toLowerCase());
        const candidates = await getSearch();


        if (candidates.length === 0) {
            reply.code(404).send({ error: 'Nenhum candidato encontrado' });
            return;
        }

        const sameSkill: Candidate[] = [];

        candidates.forEach((candidate: Candidate) => {
            const candidateSkills = candidate.skills.map(skill => skill.toLowerCase());
            const allSkills = skillsArray.every(skill => candidateSkills.includes(skill));

            if (allSkills) {
                sameSkill.push(candidate);
            }
        });

        if (sameSkill.length === 0) {
            reply.code(404).send({ error: 'Nenhum candidato com as skills escolhidas' });
            return
        } else {
            reply.send(sameSkill);
        }
    } catch (error) {
        console.error('Error:', error);
        reply.code(400).send({ error: 'Bad Request..' });
    }
});



try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}








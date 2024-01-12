import React from "react"
import { v4 as uuidv4 } from "uuid"
import styled from 'styled-components'
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios'

const Container = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center; 
`;
const Input = styled.div`
    margin:.5rem .5rem;
    display:'flex';
    align-items:center

`
const Create = () => {
    const [name, setName] = React.useState("")
    const [jusList, setJusList] = React.useState([])

    const [skillList, setSkillList] = React.useState([
        {
            skill: '',
            id: uuidv4(),
        },
    ])

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const addSkillRow = () => {
        let _skillList = [...skillList]
        _skillList.push({
            skill: "",
            id: uuidv4(),
        })
        setSkillList(_skillList)
    }

    const removeSkillRow = (id: string) => {

        let _skillList = [...skillList]
        _skillList = _skillList.filter((skill) => skill.id !== id)
        setSkillList(_skillList)
    }

    const handleSkillChange = (
        id: string,
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {

        const index = skillList.findIndex((m) => m.id === id)

        let _skillList = [...skillList] as any
        _skillList[index][event.target.name] = event.target.value
        setSkillList(_skillList)
    }

    const handleSubmit = () => {
        const skillValues = skillList.map(item => item.skill)

        const url = 'http://localhost:3000/candidate'
        const data = {
            "name": name,
            "skills": skillValues
        }

        axios.post(url, data)
            .then((response) => {
                setName('')
                setSkillList([])
            })
            .catch((error) => {
                console.log('erro')
            })
    }


    return (
        <>
            <Container>
                <div>
                    <Typography
                        variant="h4"
                        gutterBottom>
                        Cadastro
                    </Typography>
                </div>

                <div>
                    <Input>
                        <TextField
                            id="name"
                            label="Nome"
                            variant="outlined"
                            required
                            onChange={handleNameChange}
                        />
                    </Input>
                    {skillList.map((skill) => (
                        <div key={skill.id} >
                            <Input>
                                <TextField
                                    name="skill"
                                    label="Skill"
                                    type="text"
                                    required
                                    onChange={(e) => handleSkillChange(skill.id, e)}
                                />
                                <Fab
                                    size="small"
                                    style={{ marginLeft: '10px' }}
                                    aria-label="add"
                                    color="primary"
                                    onClick={addSkillRow}>
                                    <AddIcon />
                                </Fab>

                                {skillList.length > 1 && (
                                    <Fab
                                        size="small"
                                        style={{ marginLeft: '10px' }}
                                        aria-label="add"
                                        color="primary"
                                        onClick={() => removeSkillRow(skill.id)}>
                                        <DeleteIcon />
                                    </Fab>
                                )}
                            </Input>
                        </div>
                    ))}
                    <Input>
                        <Button
                            variant="contained"

                            onClick={handleSubmit}
                        >Salvar
                        </Button>
                    </Input>
                </div>
            </Container>
        </>
    )
}
export default Create


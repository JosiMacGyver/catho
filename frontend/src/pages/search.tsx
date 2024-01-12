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

const Search = () => {

    const [skillList, setSkillList] = React.useState([
        {
            skill: '',
            id: uuidv4(),
        },
    ])

    const [show, setShow] = React.useState(false)
    const [validCandidates, setValidCandidates] = React.useState([])

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
        _skillList = _skillList.filter((member) => member.id !== id)
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
        const skillsArray = skillList.map(obj => obj.skill);
        const skillsString = skillsArray.join(',')

        const url = 'http://localhost:3002/candidate/search?skills=' + skillsString

        axios.get(url)
            .then((response) => {
                setValidCandidates(response.data)
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
                        Busca
                    </Typography>
                </div>

                <div>
                    {skillList.map((member) => (
                        <div key={member.id} >
                            <Input>
                                <TextField
                                    name="skill"
                                    label="Skill"
                                    type="text"
                                    required
                                    onChange={(e) => handleSkillChange(member.id, e)}
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
                                        onClick={() => removeSkillRow(member.id)}>
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

                {show ?
                    <>
                        {validCandidates.map(candidate => {
                            <div key={candidate.id}>
                                <Typography
                                    variant="body1"
                                    gutterBottom>
                                    Nome:{candidate.name}
                                </Typography>
                                <Typography
                                    variant="body1"
                                    gutterBottom>
                                    Skills:{candidate.skills.join(',')}
                                </Typography>
                            </div>
                        })}

                    </>
                    :
                    <></>}
            </Container>
        </>
    )
}
export default Search


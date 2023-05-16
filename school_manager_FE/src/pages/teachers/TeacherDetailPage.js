import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import {
    Avatar,
    Typography,
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Stack,
    Alert
}
    from "@mui/material";
import { tableCellClasses } from '@mui/material/TableCell';
import { getClassTeacherDetail } from "../../services/teacherService";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: 500,
    width: 400
}));

export default function TeacherDeTailPage({ teacher }) {
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        getClassTeacherDetail(teacher.id).then((res) => {
            setClasses(res.data)
        })
    }, [teacher])
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                {teacher && classes.length !== 0 &&
                    <Item sx={{ boxShadow: 2 }}>
                        <Avatar
                            alt="Remy Sharp"
                            src={teacher.image}
                            sx={{ width: 200, height: 200, mx: 'auto', mt: 4, mb: 2, boxShadow: 2 }}
                        />
                        <Typography variant="h3" align="center" mb={2}>{teacher.name}</Typography>
                        <Box mb={1}>
                            <Typography variant="subtitle1" ml={4} mb={2} component="span">Teacher Id:</Typography>
                            <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{teacher.id}</Typography>
                        </Box>
                        <Box mb={1}>
                            <Typography variant="subtitle1" ml={4} mb={2} component="span">Phone:</Typography>
                            <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{teacher.phone}</Typography>
                        </Box>
                        <Box mb={1}>
                            <Typography variant="subtitle1" ml={4} mb={2} component="span">Gender:</Typography>
                            <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{teacher.gender}</Typography>
                        </Box>
                        <Box mb={1}>
                            <Typography variant="subtitle1" ml={4} mb={2} component="span">Subject: </Typography>
                            <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }}>{teacher.subject.subjectName}</Typography>
                        </Box>
                        <Box mb={1}>
                            <Typography variant="subtitle1" ml={4} mb={2} component="span">Teach Class: </Typography>
                            {
                                classes.map((item) =>                                   
                                        <Typography variant="body1" ml={2} mb={2} component="span" sx={{ fontStyle: 'italic' }} key ={item.studyClass_id}>
                                            {item.studyClass_className},
                                        </Typography>  
                                )
                            }

                        </Box>
                    </Item>
                }
            </Box>

        </>
    )

}

import { Helmet } from 'react-helmet-async';
import { filter, identity } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// @mui
import {
  Card,
  Table,
  Stack,
  Paper,
  Avatar,
  Alert,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// components
import Label from '../../components/label';
import Iconify from '../../components/iconify';
import Scrollbar from '../../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../../sections/@dashboard/user';
// mock
import { getStudents, deleteStudentApi } from '../../services/userService'
import { deleteOneStudent, getAllStudent } from '../../features/students/studentSlice'

import { FormAddStudent } from '../../sections/@dashboard/user/studentAdd';
import { FormEditStudent } from '../../sections/@dashboard/user/studentEdit';
// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: "id", label: 'id', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'gender', label: 'Gender', alignRight: false },
  { id: 'group', label: 'Class', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.studentName.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function StudentPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const students = useSelector(state => state.students);

  const [student, setStudent] = useState({});

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('id');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [open, setOpen] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [idDelete, setIdDelete] = useState(-1)

  const handleClickOpen = (id) => {
    setOpen(true);
    setIdDelete(id);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClickOpenEdit = (id) => {

    const student = students.find((item) => {
      return item.id === id
    })
    console.log(student)
    setStudent(student);
    setOpenEdit(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenAdd(false);
    setOpenEdit(false);
  };

  const handleDelete = (id) => {
    setOpen(false);
    deleteStudentApi(id).then(() => {
      dispatch(deleteOneStudent(id));
      toast.success("delete student success!")
    });
  }

  const handleClickDetail = (id) =>{
    navigate(`/dashboard/students/${id}`)
  }

  useEffect(() => {
    getStudents().then(res => {
      dispatch(getAllStudent(res.data))
    })
  }, [])

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = students.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };


  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - students.length) : 0;

  const filteredUsers = applySortFilter(students, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title> Student Manager </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Student
          </Typography>
          <Button variant="contained" onClick={handleClickOpenAdd} startIcon={<Iconify icon="eva:plus-fill" />}>
            New Student
          </Button>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={students.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const { id, studentName, gender, image, studyClass } = row;
                    const selectedUser = selected.indexOf(id) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, id)} />
                        </TableCell>
                        <TableCell align="left">
                          {id}
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={studentName} src={image} />
                            <Typography variant="subtitle2" noWrap>
                              {studentName}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">
                          <Label color={(gender === 'male' && 'error') || 'success'}>{sentenceCase(gender)}</Label>
                        </TableCell>
                        <TableCell align="left">{studyClass.className}</TableCell>
                        <TableCell align="center">
                          <Button variant="outlined" sx={{ mr: 2 }} color="info" onClick={() => handleClickOpenEdit(id)}>
                            Update
                          </Button>
                          <Button variant="outlined" sx={{ mr: 2 }} color="error" onClick={() => handleClickOpen(id)}>
                            Delete
                          </Button>
                          <Button variant="outlined" color="success" onClick={() => handleClickDetail(id)}>
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            Not found
                          </Typography>

                          <Typography variant="body2">
                            No results found for &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Try checking for typos or using complete words.
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={students.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      {/* dialog delete */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <Typography color="error" variant='h5' component={'span'}>Delete Student</Typography>
        </DialogTitle>
        <Alert severity="error">
          <Typography variant='h6' component={'span'}>Do you wan't delete this Student?</Typography>
        </Alert>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(idDelete)} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* dialog add newStudent */}
      <Dialog open={openAdd} onClose={handleClose} maxWidth="md">
        <DialogTitle>Add New Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To add student to this website, please enter student's information here.
          </DialogContentText>
          <FormAddStudent />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* dialog edit Student */}
      <Dialog open={openEdit} onClose={handleClose} maxWidth="md">
        <DialogTitle>Update New Student</DialogTitle>
        <DialogContent>
          <DialogContentText mb={2}>
            To update student to this website, please enter student's information here.
          </DialogContentText>
          <FormEditStudent student={student} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

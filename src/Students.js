// src/Students.js
import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
  Avatar,
  Chip,
  Switch,
  FormControlLabel,
  TableSortLabel,
  TablePagination,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Students() {
  // Theme state
  const [darkMode, setDarkMode] = useState(false);

  // Students data
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [mobile, setMobile] = useState("");
  const [age, setAge] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [confirmDelete, setConfirmDelete] = useState({ open: false, id: null });

  // Search & Filter
  const [search, setSearch] = useState("");

  // Sorting
  const [sortField, setSortField] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Snackbar
  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  // Validation
  const validateForm = () => {
    if (!name || !fatherName || !mobile || !age) {
      showSnackbar("Please fill all fields", "warning");
      return false;
    }
    if (!/^\d+$/.test(mobile)) {
      showSnackbar("Mobile must be numbers only", "warning");
      return false;
    }
    if (age <= 0) {
      showSnackbar("Age must be positive", "warning");
      return false;
    }
    if (!/^[A-Za-z ]+$/.test(name) || !/^[A-Za-z ]+$/.test(fatherName)) {
      showSnackbar("Name and Father Name should contain letters only", "warning");
      return false;
    }
    return true;
  };

  // Add student
  const handleAdd = () => {
    if (!validateForm()) return;
    const newStudent = { id: Date.now(), name, fatherName, mobile, age };
    setStudents([...students, newStudent]);
    setName(""); setFatherName(""); setMobile(""); setAge("");
    showSnackbar("Student added successfully!");
  };

  // Delete student
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
    showSnackbar("Student deleted", "info");
  };

  // Open edit
  const handleEditOpen = (student) => {
    setEditStudent(student);
    setOpenEdit(true);
  };

  // Save edit
  const handleEditSave = () => {
    if (!validateForm()) return;
    setStudents(
      students.map((s) =>
        s.id === editStudent.id
          ? { ...s, name: editStudent.name, fatherName: editStudent.fatherName, mobile: editStudent.mobile, age: editStudent.age }
          : s
      )
    );
    setOpenEdit(false);
    setEditStudent(null);
    showSnackbar("Student updated successfully!");
  };

  // Sorting
  const handleSort = (field) => {
    const isAsc = sortField === field && sortOrder === "asc";
    setSortField(field);
    setSortOrder(isAsc ? "desc" : "asc");
  };

  const sortedStudents = [...students]
    .filter(
      (s) =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.fatherName.toLowerCase().includes(search.toLowerCase()) ||
        s.mobile.includes(search)
    )
    .sort((a, b) => {
      if (sortField === "age" || sortField === "id") {
        return sortOrder === "asc" ? a[sortField] - b[sortField] : b[sortField] - a[sortField];
      } else {
        return sortOrder === "asc"
          ? a[sortField].localeCompare(b[sortField])
          : b[sortField].localeCompare(a[sortField]);
      }
    });

  // Pagination handlers
  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Determine badge color based on age
  const getAgeChipColor = (age) => {
    if (age < 10) return "success";
    if (age <= 18) return "primary";
    return "warning";
  };

  return (
    <Container sx={{ mt: 4, backgroundColor: darkMode ? "#333" : "#fff", color: darkMode ? "#fff" : "#000", p: 3, borderRadius: 2 }}>
      <h2>Students List</h2>

      {/* Theme toggle */}
      <FormControlLabel
        control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
        label="Dark Mode"
      />

      {/* Search */}
      <TextField
        label="Search by Name, Father or Mobile"
        fullWidth
        sx={{ mt: 2, mb: 2 }}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Input fields */}
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mr: 2, mb: 2 }} />
      <TextField label="Father's Name" value={fatherName} onChange={(e) => setFatherName(e.target.value)} sx={{ mr: 2, mb: 2 }} />
      <TextField label="Mobile" type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} sx={{ mr: 2, mb: 2 }} />
      <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} sx={{ mr: 2, mb: 2 }} />
      <div>
        <Button variant="contained" onClick={handleAdd} sx={{ mr: 2 }}>Add</Button>
      </div>

      {/* Students Table */}
      <TableContainer component={Paper} sx={{ mt: 3 }}>
        <Table>
          <TableHead>
            <TableRow>
              {["id", "name", "fatherName", "mobile", "age"].map((field) => (
                <TableCell key={field}>
                  <TableSortLabel
                    active={sortField === field}
                    direction={sortField === field ? sortOrder : "asc"}
                    onClick={() => handleSort(field)}
                  >
                    {field === "id" ? "ID" : field === "fatherName" ? "Father's Name" : field.charAt(0).toUpperCase() + field.slice(1)}
                  </TableSortLabel>
                </TableCell>
              ))}
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.id}</TableCell>
                <TableCell>
                  <Avatar sx={{ mr: 1, display: "inline-flex" }}>{student.name.charAt(0)}</Avatar>
                  {student.name}
                </TableCell>
                <TableCell>{student.fatherName}</TableCell>
                <TableCell>{student.mobile}</TableCell>
                <TableCell>
                  <Chip label={student.age} color={getAgeChipColor(student.age)} />
                </TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handleEditOpen(student)}><EditIcon /></IconButton>
                  <IconButton color="error" onClick={() => setConfirmDelete({ open: true, id: student.id })}><DeleteIcon /></IconButton>
                </TableCell>
              </TableRow>
            ))}
            {sortedStudents.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">No students found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={sortedStudents.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        rowsPerPageOptions={[5, 10, 15]}
      />

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField label="Name" fullWidth sx={{ mt: 2 }} value={editStudent?.name || ""} onChange={(e) => setEditStudent({ ...editStudent, name: e.target.value })} />
          <TextField label="Father's Name" fullWidth sx={{ mt: 2 }} value={editStudent?.fatherName || ""} onChange={(e) => setEditStudent({ ...editStudent, fatherName: e.target.value })} />
          <TextField label="Mobile" fullWidth sx={{ mt: 2 }} value={editStudent?.mobile || ""} onChange={(e) => setEditStudent({ ...editStudent, mobile: e.target.value })} />
          <TextField label="Age" type="number" fullWidth sx={{ mt: 2 }} value={editStudent?.age || ""} onChange={(e) => setEditStudent({ ...editStudent, age: e.target.value })} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={confirmDelete.open} onClose={() => setConfirmDelete({ open: false, id: null })}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>Are you sure you want to delete this student?</DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDelete({ open: false, id: null })}>Cancel</Button>
          <Button variant="contained" color="error" onClick={() => { handleDelete(confirmDelete.id); setConfirmDelete({ open: false, id: null }); }}>Delete</Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar open={snackbar.open} autoHideDuration={3000} onClose={() => setSnackbar({ ...snackbar, open: false })} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert severity={snackbar.severity} variant="filled" onClose={() => setSnackbar({ ...snackbar, open: false })}>{snackbar.message}</Alert>
      </Snackbar>
    </Container>
  );
}

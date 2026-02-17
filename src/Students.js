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
  DialogTitle
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [editStudent, setEditStudent] = useState(null);

  // Add new student
  const handleAdd = () => {
    if (!name || !age) return;
    const newStudent = { id: Date.now(), name, age };
    setStudents([...students, newStudent]);
    setName("");
    setAge("");
  };

  // Delete student
  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  // Open edit dialog
  const handleEditOpen = (student) => {
    setEditStudent(student);
    setOpenEdit(true);
  };

  // Save edited student
  const handleEditSave = () => {
    setStudents(
      students.map((s) =>
        s.id === editStudent.id ? { ...s, name: editStudent.name, age: editStudent.age } : s
      )
    );
    setOpenEdit(false);
    setEditStudent(null);
  };

  // Save all students (example: console log)
  const handleSaveAll = () => {
    console.log("Saved Students:", students);
    alert("Students saved successfully!");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h2>Students List</h2>

      {/* Input fields */}
      <TextField
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ mr: 2 }}
      />
      <TextField
        label="Age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        sx={{ mr: 2 }}
      />
      <Button variant="contained" onClick={handleAdd}>Add</Button>
      <Button variant="outlined" color="success" onClick={handleSaveAll} sx={{ ml: 2 }}>Save</Button>

      {/* Students Table */}
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {students.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} align="center">No students added</TableCell>
              </TableRow>
            ) : (
              students.map((student) => (
                <TableRow key={student.id}>
                  <TableCell>{student.id}</TableCell>
                  <TableCell>{student.name}</TableCell>
                  <TableCell>{student.age}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEditOpen(student)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(student.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Dialog */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>Edit Student</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            fullWidth
            sx={{ mt: 2 }}
            value={editStudent?.name || ""}
            onChange={(e) =>
              setEditStudent({ ...editStudent, name: e.target.value })
            }
          />
          <TextField
            label="Age"
            type="number"
            fullWidth
            sx={{ mt: 2 }}
            value={editStudent?.age || ""}
            onChange={(e) =>
              setEditStudent({ ...editStudent, age: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleEditSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

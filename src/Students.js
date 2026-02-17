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
  IconButton
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Students() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const handleAdd = () => {
    if (!name || !age) return;
    const newStudent = { id: Date.now(), name, age };
    setStudents([...students, newStudent]);
    setName("");
    setAge("");
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleSave = () => {
    console.log("Saved Students:", students);
    alert("Students saved successfully!");
  };

  return (
    <Container sx={{ mt: 4 }}>
      <h2>Students List</h2>
      <TextField label="Name" value={name} onChange={(e) => setName(e.target.value)} sx={{ mr: 2 }} />
      <TextField label="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} sx={{ mr: 2 }} />
      <Button variant="contained" onClick={handleAdd}>Add</Button>
      <Button variant="outlined" color="success" onClick={handleSave} sx={{ ml: 2 }}>Save</Button>

      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Action</TableCell>
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
    </Container>
  );
}

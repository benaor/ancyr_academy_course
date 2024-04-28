"use client";

import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGuestSection } from "@ratatouille/modules/order/react/sections/useGuestSection";

export const GuestSection: React.FC<{}> = () => {
  const presenter = useGuestSection();
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5">Guests</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.form.guests.map((guest) => {
          return (
            <Grid item key={guest.id}>
              <GestRow
                id={guest.id}
                firstName={guest.firstName}
                lastName={guest.lastName}
                age={guest.age}
                onChange={presenter.changeOrganizer}
                remove={presenter.removeGuest}
              />
            </Grid>
          );
        })}
      </Grid>
      <Grid
        container
        direction={"row"}
        alignItems={"center"}
        spacing={1}
        marginTop={2}
      >
        <Grid item>
          <Button variant="contained" onClick={presenter.addGuest}>
            Add
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={presenter.onNext}>
            Next
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

const GestRow: React.FC<{
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  onChange: (id: string, key: string, value: string | number) => void;
  remove: (id: string) => void;
}> = ({ id, firstName, lastName, age, onChange, remove }) => {
  return (
    <Box>
      <Grid container direction={"row"} alignItems={"center"} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>firstName</FormLabel>
            <TextField
              value={firstName}
              onChange={(e) => onChange(id, "firstName", e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>lastName</FormLabel>
            <TextField
              value={lastName}
              onChange={(e) => onChange(id, "lastName", e.target.value)}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl>
            <FormLabel>Age</FormLabel>
            <TextField
              value={age}
              onChange={(e) => onChange(id, "age", parseInt(e.target.value))}
            />
          </FormControl>
        </Grid>
        <Button
          variant="contained"
          onClick={() => remove(id)}
          startIcon={<DeleteIcon />}
          color="error"
        />
      </Grid>
    </Box>
  );
};

"use client";

import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useGuestSection } from "@ratatouille/modules/order/react/sections/useGuestSection";
import { OrderingDomainModel } from "@ratatouille/modules/order/core/model/ordering.domain-model";

export const GuestSection: React.FC<{}> = () => {
  const presenter = useGuestSection();
  return (
    <Box sx={{ marginTop: 2 }}>
      <Typography variant="h5">Guests</Typography>
      <Grid sx={{ paddingTop: 2 }} rowSpacing={4}>
        {presenter.form.guests.map((guest) => (
          <Grid item key={guest.id}>
            <GestRow
              id={guest.id}
              firstName={guest.firstName}
              lastName={guest.lastName}
              age={guest.age}
              isOrganizer={guest.id === presenter.form.organizerId}
              onChange={presenter.updateGuest}
              remove={presenter.removeGuest}
              changeOrganizer={presenter.changeOrganizer}
            />
          </Grid>
        ))}
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
          <Button
            variant="contained"
            onClick={presenter.onNext}
            disabled={!presenter.isSubmittable}
          >
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
  isOrganizer: boolean;

  onChange: <T extends keyof OrderingDomainModel.Guest>(
    id: string,
    key: T,
    value: OrderingDomainModel.Guest[T]
  ) => void;
  remove: (id: string) => void;
  changeOrganizer: (id: string) => void;
}> = ({
  id,
  firstName,
  lastName,
  age,
  isOrganizer,
  onChange,
  remove,
  changeOrganizer,
}) => {
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
        <FormControlLabel
          label="Organisateur"
          control={
            <Checkbox
              checked={isOrganizer}
              onChange={() => changeOrganizer(id)}
            />
          }
        />
        <Box sx={{ marginTop: 2 }}>
          <Button
            variant="contained"
            onClick={() => remove(id)}
            startIcon={<DeleteIcon />}
            color="error"
          >
            Supprimer
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

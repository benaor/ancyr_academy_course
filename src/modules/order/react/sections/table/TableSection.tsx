import { Box, Grid, FormControl, FormLabel, TextField } from "@mui/material";

export const TableSection: React.FC = () => {
  return (
    <Box>
      <Grid container direction={"row"} alignItems={"center"} spacing={1}>
        <Grid item>
          <FormControl>
            <FormLabel>Table</FormLabel>
            <TextField />
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

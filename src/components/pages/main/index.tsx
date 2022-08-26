import React, { FC } from "react";
import { Container, Unstable_Grid2 as Grid, Card } from "@mui/material";

import Header from "../../header";
import Footer from "../../footer";
import { Switch } from "@mui/material";
import {
  useAppContext,
  useAppContextUpdate,
} from "../../../context/main-context";

const Main: FC = () => {
  const theme = useAppContext();
  const toggleTheme = useAppContextUpdate();

  const themeStyles = {
    backgroundColor: theme.dark ? "#333" : "#CCC",
    color: theme.dark ? "#CCC" : "#333",
    padding: "2rem",
    marging: "2rem",
  };

  const justKidding = (
    <Container maxWidth={"sm"}>
      <Grid
        container
        direction={"column"}
        justifyContent="center"
        height={"100vh"}
      >
        <Card sx={themeStyles}>
          <h1 style={{ textAlign: "center" }}>Hello FDK</h1>
          <h6 style={{ textAlign: "center" }}>From Team NOT-POR-TER</h6>
        </Card>
        <Switch checked={theme.dark} onChange={toggleTheme} />
      </Grid>
    </Container>
  );

  return (
    <>
      <Header />
      {justKidding}
      <Footer />
    </>
  );
};

export default Main;

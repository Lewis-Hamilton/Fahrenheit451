import { Card, CardContent, Grid } from "@material-ui/core";
import React, { useState } from "react";
import PublishForm from "./form";
import FormSettings from "./formSettings";

const PublishDashboard = () => {
  const [formSettings, setFormSettings] = useState({
    addThumbnailByURL: false,
    requireDescription: true,
    addVideoByURL: true,
  });

  return (
    <Grid container justify='center'>
      <Card elevation={0}>
        <CardContent>
          <Grid
            container
            alignContent='center'
            alignItems='baseline'
            spacing={10}
            justify='center'
          >
            <Grid item xs={8}>
              <PublishForm {...formSettings} />
            </Grid>
            <Grid item xs={4}>
              <FormSettings
                {...formSettings}
                setFormSettings={setFormSettings}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default PublishDashboard;

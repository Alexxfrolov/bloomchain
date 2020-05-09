import React, { memo } from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Box from "@material-ui/core/Box"
import Typography from "@material-ui/core/Typography"

import { CenteredTemplate } from "../templates"

export const FullPageLoadScreen = memo(() => (
  <CenteredTemplate>
    <CircularProgress color="primary" size={60} />
  </CenteredTemplate>
))

type FullPageErrorScreenProps = {
  errorMessage: string
}

export const FullPageErrorScreen = memo(
  ({ errorMessage }: FullPageErrorScreenProps) => (
    <CenteredTemplate>
      <Box>
        <Typography align="center" component="h1" variant="h3">
          Oh no! Something went wrong...
        </Typography>
        <Typography align="center" variant="body1">
          <pre>{errorMessage}</pre>
        </Typography>
      </Box>
    </CenteredTemplate>
  ),
)

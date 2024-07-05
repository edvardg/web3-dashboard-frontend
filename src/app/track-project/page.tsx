'use client'

import React from 'react'
import { Container, Button, Typography, Box } from '@mui/material'
import { useRouter } from 'next/navigation'
import AddProjectForm from '../../components/AddProjectForm'
import WithAuth from '@/hocs/WithAuth'

const TrackProjectPage = () => {
  const router = useRouter()

  return (
    <Container>
      <Box display="flex" alignItems="center" mb={2}>
        <Button
          onClick={() => router.push('/dashboard')}
          variant="contained"
          color="primary"
          sx={{ marginRight: 2 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1">
          Track New Project
        </Typography>
      </Box>
      <AddProjectForm />
    </Container>
  )
}

export default WithAuth(TrackProjectPage)

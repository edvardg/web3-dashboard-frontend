import React, { useState } from 'react'
import {
  Container,
  Button,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
} from '@mui/material'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/authStore'
import { useProjectStore } from '@/stores/projectStore'
import SearchProject from './SearchProject'

const AddProjectForm = () => {
  const router = useRouter()
  const { accessToken } = useAuthStore()
  const { projects, fetchProjects, addTrackedProject } = useProjectStore()
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null
  )
  const [bookmarked, setBookmarked] = useState(false)

  const handleSearch = (key: string) => {
    fetchProjects(key, accessToken!)
  }

  const handleSelectProject = (projectId: number) => {
    setSelectedProjectId(projectId)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedProjectId !== null) {
      await addTrackedProject(accessToken!, selectedProjectId, bookmarked)
      router.push('/dashboard')
    }
  }

  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <SearchProject
          onProjectSelect={handleSelectProject}
          onSearch={handleSearch}
          projects={projects}
          selectedProjectId={selectedProjectId}
        />
        {selectedProjectId && (
          <Typography variant="body1" sx={{ mt: 2 }}>
            Selected Project:{' '}
            {projects.find((project) => project.id === selectedProjectId)?.name}
          </Typography>
        )}
        <FormControlLabel
          control={
            <Checkbox
              checked={bookmarked}
              onChange={(e) => setBookmarked(e.target.checked)}
              name="bookmarked"
              color="primary"
            />
          }
          label="Bookmark"
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          disabled={!selectedProjectId}
          sx={{ mt: 3, mb: 2 }}
        >
          Add Project
        </Button>
      </Box>
    </Container>
  )
}

export default AddProjectForm

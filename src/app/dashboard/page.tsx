'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Card, Tabs, Tab, Box, Badge, Avatar, Grid, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { useProjectStore } from '@/stores/projectStore';
import { UserProject } from '@/interfaces';
import WithAuth from "@/hocs/WithAuth";

const Dashboard = () => {
    const router = useRouter();
    const { accessToken } = useAuthStore();
    const { trackedProjects, fetchTrackedProjects } = useProjectStore();
    const [tabValue, setTabValue] = useState(0);

    useEffect(() => {
        if (accessToken) {
            fetchTrackedProjects(accessToken);
        }
    }, [accessToken, fetchTrackedProjects]);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    const filterProjects = (type: string): UserProject[] => {
        const filtered = trackedProjects.filter(({ project }) => project.type === type);
        return filtered.sort((a, b) => (b.bookmarked ? 1 : 0) - (a.bookmarked ? 1 : 0));
    };

    const renderProjects = (projects: UserProject[]) =>
        projects.map(({ project, bookmarked }) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={project.id}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 2,
                        borderRadius: 2,
                        boxShadow: 3,
                        transition: 'transform 0.2s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.05)',
                        },
                    }}
                >
                    <Badge
                        color="secondary"
                        badgeContent={<StarIcon style={{ color: '#FFD700' }} />}
                        invisible={!bookmarked}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        overlap="circular"
                    >
                        <Avatar src={project.logo} alt={project.name} sx={{ width: 80, height: 80, marginBottom: 2 }} />
                    </Badge>
                    <Typography variant="h6" gutterBottom>
                        {project.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        ${project.price}
                    </Typography>
                </Card>
            </Grid>
        ));

    return (
        <Container>
            <Tabs value={tabValue} onChange={handleTabChange} aria-label="project categories">
                <Tab label="Tokens" />
                <Tab label="NFT Projects" />
            </Tabs>
            <Box mt={2}>
                <Button variant="contained" color="primary" onClick={() => router.push('/track-project')} sx={{ mb: 2 }}>
                    Add More Projects
                </Button>
                {tabValue === 0 && (
                    <Grid container spacing={3}>
                        {renderProjects(filterProjects('token'))}
                    </Grid>
                )}
                {tabValue === 1 && (
                    <Grid container spacing={3}>
                        {renderProjects(filterProjects('nft'))}
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default WithAuth(Dashboard);

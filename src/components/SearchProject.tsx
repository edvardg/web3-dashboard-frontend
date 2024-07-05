'use client';

import React, { useState, useCallback } from 'react';
import { TextField, List, ListItem, ListItemText, Paper, Radio, FormControlLabel, debounce } from '@mui/material';
import { Project } from '@/interfaces';

interface SearchProjectProps {
    onProjectSelect: (projectId: number) => void;
    onSearch: (key: string) => void;
    projects: Project[];
    selectedProjectId: number | null;
}

const SearchProject: React.FC<SearchProjectProps> = ({ onProjectSelect, onSearch, projects, selectedProjectId }) => {
    const [searchKey, setSearchKey] = useState('');

    // Debounced search function
    const debouncedSearch = useCallback(
        debounce((key: string) => {
            onSearch(key);
        }, 500),
        [onSearch]
    );

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setSearchKey(value);
        debouncedSearch(value);
    };

    return (
        <div>
            <TextField
                fullWidth
                label="Search Project"
                value={searchKey}
                onChange={handleSearchChange}
                margin="normal"
                variant="outlined"
            />
            <Paper sx={{ maxHeight: 300, overflow: 'auto', mt: 1, border: '1px solid #ccc', borderRadius: '4px' }}>
                <List>
                    {projects.map((project) => (
                        <ListItem
                            button
                            key={project.id}
                            onClick={() => onProjectSelect(project.id)}
                            selected={project.id === selectedProjectId}
                        >
                            <ListItemText primary={project.name} secondary={project.contractAddress} />
                            <FormControlLabel
                                control={<Radio checked={project.id === selectedProjectId} />}
                                label=""
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default SearchProject;

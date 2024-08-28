import { Box, Card, CardContent, IconButton, Stack, Typography } from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow'; // Example icon

export const VideoCard = ({ icon = <PlayArrowIcon />, image, name, onClick, height, width }) => (
    <Card
        onClick={onClick}
        style={{ cursor: 'pointer' }}
        sx={{
            height,
            width,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 3,
            position: 'relative',
            overflow: 'hidden'
        }}
    >
        <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'primary.main', position: 'relative' }}>
            <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', position: 'relative' }}>
                <img src={image} alt={name} style={{ width: '100%', height: 'auto' }} />
                {icon && (
                    <IconButton
                        sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: 'rgba(255, 255, 255, 0.8)'
                        }}
                    >
                        {icon}
                    </IconButton>
                )}
            </Box>
            <Stack spacing={1} sx={{ alignItems: 'center', width: '100%', mt: 2 }}>
                <Typography variant="h6" align="center">{name}</Typography>
            </Stack>
        </CardContent>
    </Card>
);

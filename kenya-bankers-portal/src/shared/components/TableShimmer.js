import { Box, Skeleton } from "@mui/material"


export default function TableShimmer() {
    return (
        <Box sx={{ p: 3 }}>
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton variant="rectangular" height={118} />
            <Skeleton />
            <Skeleton animation="wave" />
            <Skeleton animation={false} />
            <Skeleton />
        </Box>
    )
}
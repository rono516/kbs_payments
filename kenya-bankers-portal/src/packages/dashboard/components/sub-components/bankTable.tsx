import {
    Box, Button, Card,
    CardContent, CardHeader, Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from "@mui/material";
import PrintIcon from '@mui/icons-material/Print';
export default function BankingTable({columns,rows,title, subTitle,actionName}) {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 2,
            margin: '10px',
            flexWrap: 'wrap',
        }}>
            <Card
                sx={{
                    height: {
                        xs: 'auto',
                        sm: 'auto',
                    },
                    width: {
                        xs: '100%',
                        sm: '100%',
                    },
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    alignItems: "left",
                    backgroundColor: 'secondary.contrastText',
                    color: 'primary.main',
                    cursor: "pointer",
                    padding: {
                        xs: '4px',
                        sm: '5px',
                    },
                    boxShadow: 'none',
                    borderRadius: 2,
                }}
            >
                <CardHeader
                    title={title}
                    subheader={subTitle}
                    sx={{
                        color: 'primary.main',
                        textAlign: 'left',
                        padding: 2,
                    }}
                    action={
                        <>
                            <Stack direction="row" spacing={1}>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    startIcon={<PrintIcon />}
                                    onClick={() => console.log("Printing")}
                                >
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => console.log(actionName)}
                                >
                                    {actionName}
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => console.log(actionName)}
                                >
                                    Back
                                </Button>
                            </Stack>
                        </>
                    }

                />
                <CardContent>
                    <Box>
                        <TableContainer sx={{color:'primary.main'}}>
                            <Table aria-label="simple table" size="small">
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth }}
                                                sx={{color:'primary.main'}}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            {columns.map((column) => (
                                                <TableCell key={column.id} align={column.align} sx={{color:'primary.main'}}>
                                                    {row[column.id]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}
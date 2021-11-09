import React from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';

export default function Loading(props) {

    return (
        <>
        <Stack spacing={2} alignItems="center" justifyContent="center" style={{ height: 700 }}>
            <CircularProgress size={90} />
            <p><b>{props.msg}</b></p>
        </Stack>
        </>
    )
}
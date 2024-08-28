import { Button, Dialog, DialogActions, DialogContentText, DialogContent, DialogTitle, Stack } from '@mui/material';
import * as React from 'react';
import PropTypes from 'prop-types';
import { LoadingButton } from '@mui/lab';

ConfirmDialog.propTypes = {
    onDecline: PropTypes.func,
    onConfirm: PropTypes.func,
    onDismiss: PropTypes.func,
    open: PropTypes.bool,
    message: PropTypes.any,
    title: PropTypes.any,
    cancelText: PropTypes.string,
    acceptText: PropTypes.string,
    dismissText: PropTypes.string,
    isSubmitting: PropTypes.bool,
    showDismiss: PropTypes.bool,
    showCancel: PropTypes.bool,
    maxWidth: PropTypes.string,
}
ConfirmDialog.defaultProps = {
    open: false,
    acceptText: 'Proceed',
    cancelText: 'Leave it!',
    dismissText: 'Dismiss',
    isSubmitting: false,
    showDismiss: true,
    showCancel: true,
    maxWidth: 'sm'
}
export default function ConfirmDialog(props) {
    const { onDecline, open, showCancel, onConfirm, maxWidth, message, title, dismissText, acceptText, cancelText, onDismiss, showDismiss, isSubmitting } = props
    const handleClose = () => {
        onDecline()
    };

    const handleDismiss = () => {
        onDismiss()
    };
    return (
        <Dialog
            open={open}
            fullWidth
            onClose={handleClose}
            maxWidth={maxWidth}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Stack direction="row" spacing={10} alignItems="left" justifyContent="space-between">
                    <Button sx={{ display: isSubmitting || !showDismiss ? 'none' : undefined }} color='secondary' onClick={handleDismiss}>{dismissText}</Button>
                    <Stack spacing={1} direction="row" justifyContent='right'>
                        <LoadingButton
                            color='info' sx={{ display: isSubmitting || !showCancel ? 'none' : 'block' }}
                            autoFocus
                            size="small"
                            type="submit"
                            variant="text"
                            loading={isSubmitting}
                            onClick={handleClose}>
                            {cancelText}
                        </LoadingButton>
                        <LoadingButton
                            color='error'
                            autoFocus
                            size="small"
                            type="submit"
                            variant="text"
                            loading={isSubmitting}
                            onClick={onConfirm}>
                            {acceptText}
                        </LoadingButton>
                    </Stack>
                </Stack>
            </DialogActions>
        </Dialog>
    )
}
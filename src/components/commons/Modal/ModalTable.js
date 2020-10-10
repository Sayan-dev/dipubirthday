import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import Modal from '../../commons/Modal/Modal';
import Table from '../../commons/Table/Table';
import { onlineCardHeadCells } from '../../../constants/headCells';



const useStyles = makeStyles((theme) => ({
    root: {

    },
}));


const ModalTable = ({
    ascent,
    CustomAction,
    tableData,
    headCells = {},
    title,
    onClose,
    className,
    children,
    tableProps,
    ...props
}) => {

    const classes = useStyles({ ascent });
    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);



    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    const handleRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Modal
            fullWidth
            disableTypography
            maxWidth="lg"
            onClose={onClose}
            title={title}
            borderAscent={ascent}
            {...props}
        >
            {children}
            <Table
                theadAscent={ascent}
                pages={{ page, handlePageChange }}
                rowsPerPage={{ rowsPerPage, handleRowsPerPage }}
                headCells={headCells}
                tableData={tableData}
                {...tableProps}
            />
        </Modal>
    );
};

ModalTable.propTypes = {

};

export default ModalTable;
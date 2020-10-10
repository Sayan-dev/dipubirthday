import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Checkbox from "@material-ui/core/Checkbox";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import TableFooter from "@material-ui/core/TableFooter";
import { Button,  Typography, withStyles, makeStyles, Box, Paper } from '@material-ui/core';
import { userTableCells } from '../../../constants/userConstants';
import { globalStyles, SYSTEM_COLOR_WHITE, FONT_SIZE_BODY2, SYSTEM_COLOR_METAL2, BRAND_AND_ASCENT_COLOR_02_VIOLET, FONT_SIZE_BODY1, FONT_WEIGHT_BOLD } from '../../../constants/styleConstants';
import TableCell from './TableCell';
import TableRow from './TableRow';
import TablePagination from './TablePagination';

var users = {
    byUserID: {
        "20208285276820SXNY6YXMGN0001":{
            userId: "20208285276820SXNY6YXMGN0001",
            "prefix": "Mr.",
            "firstName": "Say",
            "middleName": null,
            "lastName": "Bhat",
            "suffix": null,
            "dateOfBirth": "2020-08-26T18:30:00.000+00:00",
            "birthCountry": null,
            "birthState": null,
            "gender": "Male",
            "bloodGroup": "B+",
            "userCode": "US0322",
            "displayName": "Say  Bhat",
        },
        "2020828527zrhdf6820SXFYDXMGN0001":{
            userId: "2020828527zrhdf6820SXFYDXMGN0001",
            "prefix": "Mr.",
            "firstName": "Say",
            "middleName": null,
            "lastName": "Bhat",
            "suffix": null,
            "dateOfBirth": "2020-08-26T18:30:00.000+00:00",
            "birthCountry": null,
            "birthState": null,
            "gender": "Male",
            "bloodGroup": "B+",
            "userCode": "US0323",
            "displayName": "Say  Bhat",
        }
	},
    allUserIds: ["20208285276820SXNY6YXMGN0001", "2020828527zrhdf6820SXFYDXMGN0001"]
}

const tableStyles = makeStyles((theme) => ({
    ...globalStyles(theme),
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    topHeader: {
        width: '100%',
        display: 'flex',
        background: SYSTEM_COLOR_METAL2,
        height: 60
    },
    table: {
        minWidth: "100%",
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
    paginationTop: {
        color: SYSTEM_COLOR_WHITE,
        marginTop: 25,
        width: '100%',
        '& .MuiTablePagination-toolbar': {
            minHeight: 33,
            height: 33,
        },
        '& .MuiTypography-body2': {
            fontSize: FONT_SIZE_BODY2,
        }
    },
    pagination: {
        color: SYSTEM_COLOR_WHITE,
        '& .MuiTablePagination-toolbar': {
            minHeight: 33,
            height: 33,
            background: SYSTEM_COLOR_METAL2,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 4,

        },
        '& .MuiTypography-body2': {
            fontSize: FONT_SIZE_BODY2,
        },
    },

    tableSearchField: {
        width: '100%'
    },
    tableSearchFieldInput: {
        ...globalStyles(theme).body2,
        color: SYSTEM_COLOR_WHITE,
        '&.MuiInput-underline:before': {
            borderBottom: '1px solid #ffffffbf',
        },
        '&.MuiInput-underline:after': {
            borderBottom: '1px solid' + SYSTEM_COLOR_WHITE,
        },
        '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '1px solid ' + SYSTEM_COLOR_WHITE,
        },
    },
    tableSearchFieldInputLabel: {
        ...globalStyles(theme).body2,
        color: SYSTEM_COLOR_WHITE,
        '&.MuiFormLabel-root.Mui-focused': {
            color: SYSTEM_COLOR_WHITE,
        },
    },
    tableSearchFieldIcon: {
        ...globalStyles(theme).icon,
        color: SYSTEM_COLOR_WHITE,
        padding: 6,
        '& > span > svg': {
            fontSize: 20
        }
    },
    tableSortField: {
        width: '100%'
    },
    tableSortFieldOthers: {
        ...globalStyles(theme).body2,
        color: SYSTEM_COLOR_WHITE,
        '& > svg': {
            color: SYSTEM_COLOR_WHITE,
        },
        '&.MuiFormLabel-root.Mui-focused': {
            color: SYSTEM_COLOR_WHITE,
        },
        '&.MuiInput-underline:before': {
            borderBottom: '1px solid #ffffffbf',
        },
        '&.MuiInput-underline:after': {
            borderBottom: '1px solid ' + SYSTEM_COLOR_WHITE,
        },
        '&.MuiInput-underline:hover:not(.Mui-disabled):before': {
            borderBottom: '1px solid ' + SYSTEM_COLOR_WHITE,
        },
        '& select > option': {
            ...globalStyles(theme).selectOption,
            fontSize: FONT_SIZE_BODY2,
            backgroundColor: '#edf5ff'
        },
    }
}));
const pagingActionStyles = makeStyles(
  (theme) => ({
    ...globalStyles(theme),
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
    icon: {
        fontSize: 20,
    },
    iconDisable: {
        fontSize: 20,
        color: "#ffffff7a"
    },
    paggingButton: {
        ...globalStyles(theme).buttonBlack,
        padding: 4
    }
})
);






const RowCell = (data,index) => (eachTableCell) => {
    console.log(`${eachTableCell.id}-${index}`)
    const cellValue = data[eachTableCell.id];
    // TODO paste logic here for orgCode and roleCode
    const button = <Button>{cellValue}</Button>

    return (
        <>
            
            <TableCell 
                align="left"
                key={`${eachTableCell.id}-${index}`}
                component="th"
                id={eachTableCell.id}
                scope="row"
                ascent={"systemWash"}>
                    {cellValue }
                </TableCell>
        </>
    
    )
}



const Row = (eachId,index) => {
    // user:Object
    const user = users.byUserID[eachId];

    return<TableRow
    hover
    role="checkbox"
    tabIndex={-1}
    key={eachId}
    ascent={"secondary"}
  >
    <TableCell ascent={"systemWash"}>
                        <Checkbox
                        //   checked={isItemSelected}
                        //   inputProps={{ "aria-labelledby": labelId }}
                          color="primary"
                          size="small"
                        />
                      </TableCell>
    {userTableCells.map(RowCell(user,index))}
  </TableRow>  

}

const DataTable = ({tableRows}) => {
    const classes = tableStyles();
    const [page, setPage] =useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    // const allUsers = useSelector(state=>state.users.allUserIds);
    const allUsers = users.allUserIds;


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };



    const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, allUsers.length - page * rowsPerPage);
    const rowHeight = 33;
    return (
        <Box className={classes.root}>
            <Paper className={classes.paper}>
            <Box className={classes.topHeader}>
            <Box
            className={classes.body1}
            style={{ width: "100%", padding: 10, display: "flex" }}
            ></Box>
            </Box>

            <TableContainer>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={"small"}
                    aria-label="enhanced table"
                ><EnhancedTableHead
                classes={classes}
                // numSelected={selected.length}
                // order={order}
                // orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                // onRequestSort={handleRequestSort}
                // rowCount={rows.length}
                rows={tableRows}
                // translate={t}
                />
                    <TableBody>
                    

                        {allUsers.map(Row)}
                        {emptyRows > 0 && (
                        <TableRow ascent="systemWhite" style={{ height: rowHeight * emptyRows }}>
                        <TableCell colSpan={allUsers.length+1} />
                        </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>


                            <TablePagination 
                                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                                colSpan={12}
                                count={allUsers.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                
                            />
                       
                    </TableFooter>
                </Table>
                </TableContainer>
            
  



            </Paper>
          

        </Box>
        
                

        
    )
}

DataTable.propTypes = {
    
};




function EnhancedTableHead(props) {
    const {
      classes,
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount,
      onRequestSort,
      rows,
      
    } = props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell className={`head`}>
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{ "aria-label": "select all desserts" }}
              color="primary"
              size="small"
            />
          </TableCell>
          {rows.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={"left"}
              style={{ padding: "0px" }}
              sortDirection={orderBy === headCell.id ? order : false}
              className={`head`}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span className={classes.visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }
  
  
export default DataTable;
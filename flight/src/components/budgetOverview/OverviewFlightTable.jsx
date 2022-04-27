import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Container, Stack } from "react-bootstrap";

import PropTypes from "prop-types";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Chip from "@mui/material/Chip";

// import FormControlLabel from "@mui/material/FormControlLabel";
// import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";
import { returnMonthYear } from "../utility/functions";

import { FlightsContext } from "../contexts/FlightsContext";
import { EmployeesContext } from "../contexts/EmployeesContext";
// import ChooseQuarterBtns from "../budgetOverview/ChooseQuarterBtns";
import PlannedToggle from "./PlannedToggle";

function getQuarter(echo, q = 0) {
  var date = new Date(echo);
  var quarter = Math.floor(date.getMonth() / 3 + 1);
  // if (quarter === q) {
  //   // console.log()
  //   // console.log("same month:", quarter);
  // }
  return parseInt(quarter);
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  //   {
  //     id: "flightID",
  //     numeric: false,
  //     disablePadding: true,
  //     label: "FlightID",
  //   },
  {
    id: "ID",
    numeric: false,
    disablePadding: true,
    label: "Employee",
  },
  {
    id: "totalco2e",
    numeric: true,
    disablePadding: false,
    label: "CO2e(kg)",
  },
  {
    id: "co2ePerDay",
    numeric: true,
    disablePadding: false,
    label: "CO2e(kg)/day",
  },
  {
    id: "priority",
    numeric: true,
    disablePadding: false,
    label: "Priority",
  },
  {
    id: "echoTimeDate",
    numeric: true,
    disablePadding: false,
    label: "Date",
  },
  {
    id: "status",
    numeric: true,
    disablePadding: false,
    label: "Status",
  },
];

function EnhancedTableHead(props) {
  const {
    // onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {/* <TableCell padding="checkbox" width="5%">
          {/* <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            // onChange={onSelectAllClick}
            inputProps={{
              "aria-label": "select all flights",
            }}
          /> 
        </TableCell> 
        */}
        {headCells.map((headCell) => (
          <TableCell
            width="10%"
            // sx={{border:"2px solid black"}}
            key={headCell.id}
            // align={headCell.numeric ? "right" : "left"}
            align={"left"}
            // padding={headCell.disablePadding ? "none" : "normal"}
            padding={"none"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  //   onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Flights
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const OverviewFlightTable = ({ ...props }) => {
  const { quarter } = props;
  const { actualFlights, flights, CO2eTotal } = useContext(FlightsContext);
  const { getNameFromID } = useContext(EmployeesContext);

  var rows = actualFlights;
  // const [flightCount,setFlightCount]=useState(0)
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("echoTimeDate");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const [plannedFilter, setPlannedFilter] = useState("");
  // console.log("quarter:", quarter);
  // console.log("selected:", selected);
  const [showCompleted, setCompleted] = useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((f) => f.flightID);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, flightID, flight) => {
    const selectedIndex = selected.indexOf(flightID);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, flightID);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (flightID) => selected.indexOf(flightID) !== -1;

  var flightCount = 0;
  var countRows = (arr) => {
    flightCount = arr.length;
    return arr;
  };
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  return (
    <Container className="component-container">
      <Row style={{ borderBottom: "2px solid #c6c6c6", marginBottom: "1rem" }}>
        <h5 className="component-title">
          All flights {`${quarter!==0 ? ` - Displaying Q${quarter}` : ""}`}
        </h5>
      </Row>
      <Row style={{ justifyContent: "flex-end" }}>
        <Col md={"auto"}>
          Filter: {""}
          <PlannedToggle
          quarter = {quarter}
            setPlannedFilter={(p) => setPlannedFilter(p)}
            setCompleted={(c) => {
              setCompleted(c);
            }}
          />
        </Col>
      </Row>
      {/* <Box sx={{ width: "100%" }}> */}
      <Paper sx={{ width: "100%", boxShadow: "0" }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 550 }}
            aria-labelledby="tableTitle"
            size={"small"}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              //   onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {countRows(
                stableSort(rows, getComparator(order, orderBy)).filter((f) => {
                  if (quarter === 0 && f.status !== "unplanned") {
                    return f;
                  }
                  if (quarter !== 0) {
                    if (plannedFilter === "") {
                      if(showCompleted){
                        return f;
                      } 
                      if (!showCompleted && getQuarter(f.echoTimeDate, quarter) > quarter ) {
                        
                        return f
                      }
                     
                    }
                    if (plannedFilter === f.status) {
                      if(showCompleted){
                        return f;
                      } 
                      if (!showCompleted && getQuarter(f.echoTimeDate, quarter) > quarter ) {
                        
                        return f
                      }
                     
                    }
                  }
                  // if (quarter !== 0 && f.status === plannedFilter) {
                  //   return f;
                  // }
                })
              )
                .filter((f) => {
                  // console.log("isCompleted:", showCompleted);
                  // console.log(
                  //   "(getQuarter(f.echoTimeDate, quarter):",
                  //   getQuarter(f.echoTimeDate, quarter)
                  // );
                  if (!showCompleted) {
                    return f;
                  } else {
                    if (getQuarter(f.echoTimeDate, quarter) <= quarter) {
                      // console.log("made it here", f);
                      // console.log(
                      //   "q for here",
                      //   getQuarter(f.echoTimeDate, quarter)
                      // );
                      return f;
                    }
                  }
                })
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.flightID);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      //   hover
                      //   sx={
                      //     getQuarter(row.echoTimeDate, quarter) <= quarter
                      //       ? { color: "#5a5a5a" }
                      //       : { color: "#c49" }
                      //   }
                      // onClick={(event) =>
                      //   getQuarter(row.echoTimeDate, quarter) > quarter &&
                      //   handleClick(event, row.flightID, row)
                      // }
                      // role="checkbox"
                      // aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.flightID}
                      // selected={isItemSelected}
                    >
                      {/* <TableCell
                        padding="checkbox"
                        sx={
                          getQuarter(row.echoTimeDate, quarter) <= quarter
                            ? { color: "#bfbfbf" }
                            : { color: "#000" }
                        }
                      >
                        <Checkbox
                          color="primary"
                          disabled={
                            getQuarter(row.echoTimeDate, quarter) <= quarter
                          }
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCell> */}

                      <TableCell
                        align="left"
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                        sx={
                          getQuarter(row.echoTimeDate, quarter) <= quarter
                            ? { color: "#bfbfbf" }
                            : { color: "#000" }
                        }
                      >
                        {getNameFromID(row.ID)}
                      </TableCell>
                      <TableCell
                        padding="none"
                        align="center"
                        sx={
                          getQuarter(row.echoTimeDate, quarter) <= quarter
                            ? { color: "#bfbfbf" }
                            : { color: "#000" }
                        }
                      >
                        {row.totalco2e}
                      </TableCell>
                      <TableCell
                        padding="none"
                        align="center"
                        sx={
                          getQuarter(row.echoTimeDate, quarter) <= quarter
                            ? { color: "#bfbfbf" }
                            : { color: "#000" }
                        }
                      >
                        {row.co2ePerDay}
                      </TableCell>
                      <TableCell
                        padding="none"
                        align="left"
                        sx={
                          getQuarter(row.echoTimeDate, quarter) <= quarter
                            ? { color: "#bfbfbf" }
                            : { color: "#000" }
                        }
                      >
                        {row.priority}
                      </TableCell>
                      <TableCell
                        padding="none"
                        align="left"
                        sx={
                          getQuarter(row.echoTimeDate, quarter) <= quarter
                            ? { color: "#bfbfbf" }
                            : { color: "#000" }
                        }
                      >
                        {returnMonthYear(row.echoTimeDate)}
                      </TableCell>
                      <TableCell
                        padding="none"
                        align="right"
                        sx={
                          getQuarter(row.echoTimeDate, quarter) <= quarter
                            ? { color: "#bfbfbf" }
                            : { color: "#000" }
                        }
                      >
                        {getQuarter(row.echoTimeDate, quarter) <= quarter}
                        {row.status === "planned" ? (
                          <Chip
                            label={
                              getQuarter(row.echoTimeDate, quarter) <= quarter
                                ? "Completed"
                                : "Planned"
                            }
                            color="primary"
                            size="small"
                            variant={
                              getQuarter(row.echoTimeDate, quarter) <= quarter
                                ? "outlined"
                                : ""
                            }
                          />
                        ) : (
                          <Chip
                            label={
                              getQuarter(row.echoTimeDate, quarter) <= quarter
                                ? "Completed"
                                : "Unplanned"
                            }
                            color="warning"
                            size="small"
                            variant={
                              getQuarter(row.echoTimeDate, quarter) <= quarter
                                ? "outlined"
                                : ""
                            }
                          />
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })}
              {/* {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 25 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )} */}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={flightCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};
export default OverviewFlightTable;

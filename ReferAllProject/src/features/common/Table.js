import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableHead, TableRow, TableBody, TableCell } from "@material-ui/core";
import { Button } from '../common';
// core components
import {
  warningColor,
  primaryColor,
  dangerColor,
  successColor,
  infoColor,
  roseColor,
  grayColor,
  defaultFont,
} from "../../common/theme.js";

const styles = (theme) => ({
  warningTableHeader: {
    color: warningColor[0],
  },
  primaryTableHeader: {
    color: primaryColor[0],
  },
  dangerTableHeader: {
    color: dangerColor[0],
  },
  successTableHeader: {
    color: successColor[0],
  },
  infoTableHeader: {
    color: infoColor[0],
  },
  roseTableHeader: {
    color: roseColor[0],
  },
  grayTableHeader: {
    color: grayColor[0],
  },
  table: {
    marginBottom: "0",
    width: "100%",
    maxWidth: "100%",
    backgroundColor: "transparent",
    borderSpacing: "0",
    borderCollapse: "collapse",
  },
  tableHeadCell: {
    color: "inherit",
    ...defaultFont,
    "&, &$tableCell": {
      fontSize: "1em",
    },
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "middle",
    fontSize: "0.8125rem",
  },
  tableResponsive: {
    width: "100%",
    marginTop: "0",
    // marginTop: theme.spacing(3), JARLOU
    overflowX: "auto",
  },
  tableHeadRow: {
    height: "56px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
  tableBodyRow: {
    height: "48px",
    color: "inherit",
    display: "table-row",
    outline: "none",
    verticalAlign: "middle",
  },
});

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, tableActions } = props;
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} key={key}>
                    {prop}
                  </TableCell>
                );
              })}
              {
                tableActions !== undefined ? (<TableCell className={classes.tableCell + " " + classes.tableHeadCell} 
                colSpan={tableActions.length} style={{textAlign: 'center'}}>Actions</TableCell>) : null
              }
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.length !== 0 ? tableData.map((propRow, keyRow) => {
            return (
              <TableRow key={keyRow} className={classes.tableBodyRow}>
                {propRow.map((prop, key) => {
                  return (
                    <TableCell className={classes.tableCell} key={key} style={{textTransform: 'capitalize'}}>
                      {prop}
                    </TableCell>
                  );
                })}
                {
                  tableActions !== undefined ? (
                    tableActions.map((prop, key) => {
                      return (prop.checkStatus === undefined || (prop.checkStatus !== undefined && prop.checkStatus && propRow[3] === 'draft')) ?
                      (
                        <TableCell className={classes.tableCell} key={key}>
                          <Button color="transparent" onClick={() => prop.onClick(keyRow)} style={{'textDecoration':'underline'}}>{prop.label}</Button>
                        </TableCell>
                      ): (prop.checkStatus !== undefined && prop.checkStatus) ? (<TableCell className={classes.tableCell} key={key}></TableCell>):null
                    })
                  ) : null
                }
              </TableRow>
            )
          }): (
            <TableRow className={classes.tableBodyRow}>
              <TableCell colSpan={(tableActions !== undefined ? tableActions.length:0) + tableHead.length}>No Available Data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  tableActions: PropTypes.arrayOf(PropTypes.object)
};

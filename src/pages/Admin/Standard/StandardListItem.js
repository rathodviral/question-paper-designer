import React from "react";
import {
  ListItem,
  ListItemText,
  makeStyles,
  Typography,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  noPadding: {
    paddingLeft: 0,
    paddingRight: 0,
    borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
  },
  displayFlex: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  chipPosition: {
    position: "relative",
    top: "-2px",
    left: "5px",
  },
  dateFontSize: {
    fontSize: "0.875rem",
    margin: 0,
  },
  categoryFontStyle: {
    fontSize: "1rem",
    margin: 0,
    textTransform: "capitalize",
  },
}));

export default function StandardListItem(props) {
  const classes = useStyles();
  const { standardId, standardName, standardDetail, school, listItemClick } =
    props;

  return (
    <ListItem
      className={classes.noPadding}
      button
      onClick={(e) => listItemClick(standardId)}
    >
      <ListItemText
        primary={
          <div>
            <div className={classes.displayFlex}>
              <Typography variant="h6">
                {standardName}
                {/* {isExpense && (
                  <Chip
                    className={classes.chipPosition}
                    label={isPaid ? "Paid" : "Not Paid"}
                    color={isPaid ? "primary" : "secondary"}
                    size="small"
                  />
                )} */}
              </Typography>
              {/* <p className={classes.dateFontSize}>
                {AppDate.getDateIntoString(date, "MMM, Do YYYY")}
              </p> */}
            </div>
            <div className={classes.displayFlex}>
              <p className={classes.categoryFontStyle}>
                <b>{standardDetail}</b>
              </p>
            </div>
            <div className={classes.displayFlex}>
              <p className={classes.dateFontSize}>
                <b>School : </b>
                {school.schoolName}
              </p>
            </div>
          </div>
        }
      />
    </ListItem>
  );
}

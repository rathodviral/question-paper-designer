import React from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  makeStyles,
} from "@material-ui/core";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(6),
  },
}));

export default function AppAccordion(props) {
  const classes = useStyles();
  const {
    name,
    id,
    isOpen,
    detail,
    isExpense,
    subCategoryList = [],
    listItemClick,
  } = props;
  const [open, setOpen] = React.useState(isOpen);
  const toggleCollapse = () => {
    setOpen(!open);
  };
  return (
    <React.Fragment>
      <ListItem button onClick={toggleCollapse}>
        <ListItemIcon>
          <IconButton
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              listItemClick(false, { name, id, detail, isExpense });
            }}
          >
            <EditIcon />
          </IconButton>
        </ListItemIcon>
        <ListItemText
          primary={name}
          secondary={
            subCategoryList.length > 0
              ? `Sub Categories (${subCategoryList.length})`
              : ""
          }
        />
        {subCategoryList.length > 0 ? (
          open ? (
            <ExpandLess />
          ) : (
            <ExpandMore />
          )
        ) : (
          ""
        )}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {subCategoryList.length > 0 && (
          <List component="div" disablePadding>
            {subCategoryList.map((item, i) => (
              <ListItem button key={i} className={classes.nested}>
                <ListItemText primary={item.name} />
                <IconButton
                  size="small"
                  onClick={(e) => {
                    e.stopPropagation();
                    listItemClick(true, item);
                  }}
                >
                  <EditIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Collapse>
    </React.Fragment>
  );
}

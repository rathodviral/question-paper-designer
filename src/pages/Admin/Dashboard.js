import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core";
import { AppCountText, AppCard, AppButton } from "../../components";
import { AdminContext } from "../../contexts";
import { useHistory } from "react-router";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
});

export default function Dashboard(props) {
  const { getList } = useContext(AdminContext);
  const classes = useStyles();
  const history = useHistory();
  const cardList = [
    { title: "School", type: "school", count: getList("school").length },
    { title: "Standard", type: "standard", count: getList("standard").length },
    { title: "Subject", type: "subject", count: getList("subject").length },
  ];

  const Card = (props) => {
    const { title, type, count } = props;
    return (
      <AppCard title={title}>
        <AppCountText
          count={count}
          type={type}
          onClick={(e) => {
            history.push(`/admin/${type}`);
          }}
        ></AppCountText>
        <AppButton
          onClick={(e) => {
            history.push(`/admin/${type}/add`);
          }}
          type={type}
        >
          Add {title} Category
        </AppButton>
      </AppCard>
    );
  };

  return (
    <div className={classes.root}>
      {cardList.map((card, i) => (
        <Card key={i} title={card.title} type={card.type} count={card.count} />
      ))}
    </div>
  );
}

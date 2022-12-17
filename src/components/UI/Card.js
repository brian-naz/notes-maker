import { Edit, Delete } from "@mui/icons-material";
import { Paper, IconButton, Snackbar } from "@mui/material";
import React from "react";

function createCard(content, deletenote) {
  if (content.note !== "NULL") {
    return (
      <Card
        del={deletenote}
        id={content.id}
        key={content.id}
        title={content.title}
        content={content.note}
      />
    );
  }
}

function Card(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function taskDelete() {
    props.del(props.id);
  }
  return (
    <div>
      <div className="col s12 m3">
        <div className="card">
          <Paper variant="outlined">
            <div className="card-content">
              <span className="card-title">{props.title}</span>
              <p className="text-justify">{props.content}</p>
            </div>
            <div className="card-action blue-text">
              <div
                style={{
                  display: "flex",
                  flexDirection: "row-reverse",
                }}
              >
                <IconButton
                onClick={function() {
                  taskDelete();
                  handleClick();
                }}>
                  <Delete />
                  <Snackbar
                    open={open}
                    autoHideDuration={200}
                    onClose={handleClose}
                    message="Note deleted"
                  />
                </IconButton>
                <IconButton>
                  <Edit />
                </IconButton>
              </div>
            </div>
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default createCard;

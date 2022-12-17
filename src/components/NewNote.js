import React, { useState } from "react";
import {
  TextField,
  IconButton,
  InputBase,
  Paper,
  Snackbar,
} from "@mui/material";
import { Save } from "@mui/icons-material";

function NewNote(props) {
  const [typing, settyping] = useState(false);

  const [textareaStyle, settextareaStyle] = React.useState({
    textAlign: "justfiy",
  });

  const [content, setcontent] = useState("");
  const [title, settitle] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function newnoteadded() {
    props.add(title, content);
    settitle("");
    setcontent("");
  }

  function textareaHeight(e) {
    settextareaStyle({
      height: e.target.scrollHeight + "px",
      textAlign: "justfiy",
      maxHeight: "500px",
    });
  }
  function titlechanged(e) {
    settitle(e.target.value);
  }
  function contentchanged(e) {
    settyping(true);
    setcontent(e.target.value);
  }
  return (
    <div className="new-note">
      <div className="col s12 m6">
        <div className="card">
          <Paper elevation={3}>
            <div className="card-image">
              <span className="card-title"></span>
            </div>
            <div className="card-content">
              {typing ? (
                <TextField
                  variant="standard"
                  onChange={titlechanged}
                  value={title}
                  placeholder="Title"
                  fullWidth
                  InputProps={{ disableUnderline: true }}
                />
              ) : null}
              <p>
                <InputBase
                  value={content}
                  onClick={contentchanged}
                  onChange={contentchanged}
                  style={textareaStyle}
                  onInput={textareaHeight}
                  placeholder="Take a note..."
                  id="textarea"
                  fullWidth
                  multiline
                />
              </p>
            </div>
            {typing ? (
              <IconButton
                onClick={function() {
                  newnoteadded();
                  handleClick();
                }}
                className="btn-floating btn-large halfway-fab waves-effect waves-dark blue"
              >
                <Save />
                <Snackbar
                  open={open}
                  autoHideDuration={200}
                  onClose={handleClose}
                  message="Note saved"
                />
              </IconButton>
            ) : null}
          </Paper>
        </div>
      </div>
    </div>
  );
}

export default NewNote;

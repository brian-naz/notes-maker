import React from "react";
import createCard from "./components/UI/Card";
import NewNote from "./components/NewNote";
import {
  IconButton,
  Typography,
  CssBaseline,
  useTheme,
  ThemeProvider,
  createTheme,
  AppBar,
  Toolbar,
} from "@mui/material";
import { Description, Brightness4, Brightness7 } from "@mui/icons-material";

var localStorage = require("local-storage");

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

function App() {
  const storedNotes = JSON.parse(localStorage.get("notes"));
  const nullNote = {
    id: 9999999,
    title: "NULL",
    note: "NULL",
  };
  // console.log(storedNotes);
  const [notes, setnotes] = React.useState(() => {
    if (storedNotes != null) {
      return [
        storedNotes[0] ? storedNotes[0] : nullNote,
        storedNotes[2] ? storedNotes[2] : nullNote,
        storedNotes[1] ? storedNotes[1] : nullNote,
        storedNotes[3] ? storedNotes[3] : nullNote,
        storedNotes[4] ? storedNotes[4] : nullNote,
        storedNotes[5] ? storedNotes[5] : nullNote,
        storedNotes[6] ? storedNotes[6] : nullNote,
        storedNotes[7] ? storedNotes[7] : nullNote,
      ];
    }
  });

  function saveNotestoLocal(oldNotes, id) {
    if (notes !== oldNotes) {
      const savedNotes = notes.filter((note) => {
        return note.id !== 9999999;
      });
      localStorage("notes", JSON.stringify(savedNotes));
      console.log("Notes Saved");
    } else {
      console.log(id);
      setnotes((prevNotes) => {
        oldNotes = prevNotes;
        return prevNotes.filter((note) => note.id !== id);
      });
      setTimeout(() => {
        saveNotestoLocal(oldNotes, id);
      }, 1000);
    }
  }

  function addNote(title, content) {
    const index = Math.round(Math.random() * 100);
    setnotes((prev) => {
      return [
        ...prev,
        {
          id: index,
          title: title,
          note: content,
        },
      ];
    });
    setTimeout(saveNotestoLocal, 1000);
  }
  function deleteNote(id) {
    var oldnotes;
    setnotes((prevNotes) => {
      oldnotes = prevNotes;
      return prevNotes.filter((note) => note.id !== id);
    });
    saveNotestoLocal(oldnotes, id);
  }
  const theme = useTheme();
  const colorMode = React.useContext(ColorModeContext);
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
            >
              <Description fontSize="large" />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Notes
            </Typography>
            <IconButton onClick={colorMode.toggleColorMode} color="inherit">
              {theme.palette.mode === "dark" ? (
                <Brightness7 />
              ) : (
                <Brightness4 />
              )}
            </IconButton>
          </Toolbar>
        </AppBar>
        <NewNote add={addNote} />
        <div className="row">
          {notes.map((note) => createCard(note, deleteNote))}
        </div>
      </ThemeProvider>
    </div>
  );
}

function ToggleColorMode() {
  const [mode, setMode] = React.useState("light");
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode]
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default ToggleColorMode;

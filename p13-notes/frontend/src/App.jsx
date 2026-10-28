import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
    return (
        <div>
            <h1>My Notes App</h1>

            <NoteForm />

            <NoteList />
        </div>
    );
}

export default App;
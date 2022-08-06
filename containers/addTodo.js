// addTodo.js is where new todos are added to our backend.

function AddTodo({ addTodo }) {
    return (
        <>
        <div className="addTodoContainer">
            <input
            className="todoInputText"
            type="text"
            placeholder="Add new todo here..."
            id="ToDoText"
            onKeyDown={(e) => {
                if (e.code === "Enter") {
                addTodo(ToDoText.value);
                ToDoText.value = "";
                }
            }}
            />
            <input
            className="todoInputButton"
            type="button"
            value="Add Todo"
            onClick={() => {
                addTodo(ToDoText.value);
                ToDoText.value = "";
            }}
            />
        </div>
        </>
    );
}
export default AddTodo;
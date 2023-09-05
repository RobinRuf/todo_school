export async function deleteTodo(todoId, email) {
  try {
    const response = await fetch("/api/deleteTodo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        todoId: todoId,
      }),
    });

    if (response.ok) {
      // Sie können hier weitere Logik hinzufügen, z. B. den UI-Status aktualisieren
      console.log("ToDo erfolgreich gelöscht");
    } else {
      const data = await response.json();
      console.error("Fehler beim Löschen des ToDos:", data.message);
    }
  } catch (error) {
    console.error("Ein Fehler ist aufgetreten:", error);
  }
}

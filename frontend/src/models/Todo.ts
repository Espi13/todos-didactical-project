class Todo {
  id: number;
  name: string;
  completed: boolean;
  createdAt: string;

  constructor(id: number, name: string, completed: boolean, createdAt: string) {
    this.id = id;
    this.name = name;
    this.completed = completed;
    this.createdAt = createdAt;
  }
}

export default Todo;

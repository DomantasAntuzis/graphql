const url = "https://graphqlzero.almansi.me/api";

const form = document.getElementById("form1");
const input = document.getElementById("form1-input");
const button = document.getElementById("form1-btn");
// const poo = [];

const query = `query {
  todos {
    data {
      id
      title
      completed
      user {
        name
      }
    }
  }
}`;

// const createTodoMutation = `
// mutation AddTodoMutation{
//   createTodo(input:{title: "${form.taskname.value}", completed: false}) {
//     id
//     title
//     completed
//     user {
//       name
//     }
//   }
// }
// `;

const list = document.createElement("ul");
list.classList.add("list-group");

//display elements
async function getTodos() {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    const data = await response.json();
    const todos = data.data.todos.data;
    console.log(form);

    todos.forEach((todo) => {
      const listItem = document.createElement("li");
      listItem.classList.add("list-group-item");
      listItem.innerHTML = `${todo.title} | ID: ${todo.id} | By: ${todo.user.name}`;
      list.appendChild(listItem);
    });

    const results = document.getElementById("results");
    results.appendChild(list);
  } catch (error) {
    console.error(error);
  }
}

async function createTodo() {
  const title = form.taskname.value;
  console.log("Submitting form with title:", title);

  const createTodoMutation = `
  mutation AddTodoMutation {
    createTodo(input: { title: "${title}", completed: false }) {
      id
      title
      completed
      user {
        name
      }
    }
  }
`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: createTodoMutation
        // variables: { input: { title: title, completed: false } },
      }),
    });

    console.log(title);
    const data = await response.json();
    console.log("Mutation response:", data);

    form.taskname.value = "";

    const todo = data.data.createTodo;
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerHTML = `${todo.title} | ID: ${todo.id} | By: ${todo.user.name}`;
    list.appendChild(listItem);
    
    // poo.push(todo);
  } catch (error) {
    console.error("Mutation error:", error);
  }
}

button.addEventListener("click", createTodo);

getTodos();

const form2 = document.querySelector("#form2");
const form2Input = document.querySelector("#form2-input");
const form2Btn = document.querySelector("#form2-btn");

//rasti funkcija
form2Btn.addEventListener("click", async (e) => {
  e.preventDefault();

  const searchText = form2.searchname.value;
  console.log("Searching for text:", searchText);

  if (searchText) {
    const query = `
  query searchQuery{
    todos(options:{search: {q: "${searchText}"}, sort:{field: "id", order: ASC}}) {
      data {
      id
      title
      completed
      user {
        name
      }
      }
    }
  }
    `;
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      // console.log(response)
      const { data } = await response.json();
      // console.log(data);
      if (data.todos.data.length > 0) {
        const todo = data.todos.data[0];
        console.log(todo);
        const listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        listItem.innerHTML = `${todo.title} | ID: ${todo.id} | By: ${todo.user.name}`;
        list.appendChild(listItem);
      } else {
        console.log("Elementas nerastas");
      }
    } catch (error) {
      console.error(error);
    }
  }
});

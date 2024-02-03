# Express Backend Template

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg) ![Backend Framework](https://img.shields.io/badge/backend_framework-Express.js-green.svg) ![Backend Framework](https://img.shields.io/badge/written_in-typescript-blue.svg?logo=typescript)

A template for kickstarting your Express.js backend development. This template provides a structured setup for controllers, routes, and middleware, making it easy to organize and scale your backend applications.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Features

- **Controller and Route Decorators**: Easily define controllers and routes using decorators for cleaner and more maintainable code.
- **Controller Factory**: Manage and create instances of controllers using a centralized factory to ensure single instances.
- **HTTP Method Decorators**: Convenient decorators (`@Get`, `@Post`, `@Delete`, `@Put`, `@Patch`) for defining routes with specific HTTP methods.
- **Express App Setup**: Includes a basic setup for an Express.js application with CORS, logging, and JSON body parsing.
- **MIT License**: Use, modify, and distribute the template freely under the terms of the MIT license.

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/coderoyalty/express-backend-template.git
   ```

2. Navigate to project directory:
   ```bash
   cd express-backend-template
   ```
3. Install dependencies
   ```bash
   npm install
   ```
   or using yarn
   ```
   yarn install
   ```

### Usage

Let's create a TodoController to showcase how to use this template.

```TS
// File: controllers/todo.ts
import BaseController from "@/controllers/base.controller";
import Controller from "@utils/controller.decorator";
import {Get, Post} from "@utils/route.decorator";

// mimick a database
const todos = [
   {
    "userId": 1,
    "id": 1,
    "title": "delectus aut autem",
    "completed": false
  },
  {
    "userId": 1,
    "id": 2,
    "title": "quis ut nam facilis et officia qui",
    "completed": false
  },
  {
    "userId": 2,
    "id": 3,
    "title": "fugiat veniam minus",
    "completed": false
  },
  {
    "userId": 2,
    "id": 4,
    "title": "et porro tempora",
    "completed": true
  },
  {
    "userId": 3,
    "id": 5,
    "title": "laboriosam mollitia et enim quasi adipisci quia provident illum",
    "completed": false
  },
]

let nextId = todos.length
```

Let's create a `TodoController` class

```TS
@Controller()
export class TodoController extends BaseController {
  constructor() {
    super("/users/:id/todos");
  }
}
```

The `@Controller()` registers the TodoController to the main application. Now, let's create two methods: `fetchAll` and `createTodo`. the first method handles a `GET - /api/users/:id/todos`, while the latter handles `POST - /api/users/:id/todos`.

```TS
@Get('/')
async fetchAll(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const data = todos.filter((todo) => todo.userId === parseInt(id));
  res.json({
    data,
    count: data.length,
  });
}

 @Get("/:todoId")
  async fetch(req: express.Request, res: express.Response) {
    const { todoId, id } = req.params;
    const todo = todos.find(
      (todo) =>
        todo.id === parseInt(todoId) && todo.userId === parseInt(id)
    );

    if (!todo) {
      return res.sendStatus(404);
    }

    res.json(todo);
  }

@Post('/')
async createTodo(req: express.Request, res: express.Response) {
  const { id } = req.params;
  const { title } = req.body;
  const data = {
    userId: parseInt(id),
    id: ++nextId,
    title,
    completed: false,
   }
   todos.push(data);
   return res.status(201).json(data);
};
```

These decorators: `@Get` and `Post` register a method to the controllers' primary router. This makes it possible to add new request handlers without modifying multiple lines of code. The name of these decorators reflects on the HTTP method they assign a method to.

Now, let's add an import statement for TodoController in `/controllers/index.ts`:

```TS
//.. controllers/index.ts
import "@/controllers/base.controller";
import "@/controllers/todo"; // import our new file
```

This ensures that our module is loaded.

Now you can run the application

```bash
npm run start
```

and make requests to these endpoints:

- **`GET`** - `/api/users/:id/todos`
- **`GET`** - `/api/users/:id/todos/:todoId`
- **`POST`** - `/api/users/:id/todos`

Check the [todo example branch](https://github.com/coderoyalty/express-backend-template/tree/example-todo-app) for more implementation details.

**Task**: Add a request handler for `GET - /api/users/:id/todos/:todoId`

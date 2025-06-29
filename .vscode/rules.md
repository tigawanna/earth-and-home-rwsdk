---
description: RedwoodSDK: React, React Server Components, and React Server Functions Rules
globs: src/app/**/*/*.tsx,Document.tsx
alwaysApply: false
---

# React, React Server Components, and React Server Functions Rules

## React Server Components (RSC)

1. By default, all components are server components unless explicitly marked as client components.
2. Server components are rendered on the server as HTML and streamed to the browser.
3. Server components cannot include client-side interactivity (state, effects, event handlers).
4. Server components can directly fetch data and include it in the initial payload.
5. Server components can be async and can be wrapped in Suspense boundaries.

Example:

```tsx
export default function MyServerComponent() {
  return <div>Hello, from the server!</div>;
}
```

## Client Components

1. Must be explicitly marked with the "use client" directive at the top of the file.
2. Required when the component needs:
   - Interactivity (click handlers, state management)
   - Browser APIs
   - Event listeners
   - Client-side effects
   - Client-side routing
3. Will be hydrated by React in the browser.

Example:

```tsx
"use client";

export default function MyClientComponent() {
  return <button onClick={() => console.log("clicked")}>Click me</button>;
}
```

## Data Fetching in Server Components

1. Server components can directly fetch data without useEffect or other client-side data fetching methods.
2. Use Suspense boundaries to handle loading states for async server components.
3. Pass context (ctx) through props to child components that need it.

Example:

```tsx
export async function TodoList({ ctx }) {
  const todos = await db.todo.findMany({ where: { userId: ctx.user.id } });

  return (
    <ol>
      {todos.map((todo) => (
        <li key={todo.id}>{todo.title}</li>
      ))}
    </ol>
  );
}
```

## Server Functions

1. Must be marked with the "use server" directive at the top of the file.
2. Can be imported and used in client components.
3. Execute on the server when called from client components.
4. Have access to the request context via requestInfo.ctx.
5. Can handle form submissions and other server-side operations.

Example:

```tsx
"use server";

import { requestInfo } from "rwsdk/worker";

export async function addTodo(formData: FormData) {
  const { ctx } = requestInfo;
  const title = formData.get("title");
  await db.todo.create({ data: { title, userId: ctx.user.id } });
}
```

## Context Usage

1. Context is available to all server components and server functions.
2. Access context via:
   - requestInfo in server functions:
   ```
   import { requestInfo } from "rwsdk/worker";
   const { ctx } = requestInfo
   ```
3. Context is populated by middleware and interruptors and is request-scoped.

## Best Practices

1. Keep server components as the default choice unless client-side interactivity is needed.
2. Use client components only when necessary to minimize the JavaScript bundle size.
3. Leverage server components for data fetching and initial rendering.
4. Use Suspense boundaries appropriately for loading states.
5. Keep client components as small as possible, moving server-side logic to server components or server functions.
6. Always mark client components with "use client" directive.
7. Always mark server functions with "use server" directive.



---
description: RedwoodSDK: Request Interruptors
globs: worker.tsx,src/app/**/routes.ts,src/app/**/*/routes.ts
alwaysApply: false
---


# RedwoodSDK: Request Interruptors

You're an expert at Cloudflare, TypeScript, and building web apps with RedwoodSDK. Generate high quality **RedwoodSDK interruptors** (middleware functions) that adhere to the following best practices:

## Guidelines

1. Create focused, single-responsibility interruptors
2. Organize interruptors in dedicated files (e.g., `interruptors.ts`, `interceptors.ts`, or `middleware.ts`)
3. Compose interruptors to create more complex validation chains
4. Use typed parameters and return values
5. Include clear error handling and user feedback

## What are Interruptors?

Interruptors are middleware functions that run before your route handlers. They can:

- Validate user authentication and authorization
- Transform request data
- Validate inputs
- Rate limit requests
- Log activity
- Redirect users based on conditions
- Short-circuit request handling with early responses

## Example Templates

### Basic Interruptor Structure

```tsx
async function myInterruptor({ request, params, ctx }) {
  // Perform checks or transformations here

  // Return modified context to pass to the next interruptor or handler
  ctx.someAddedData = "value";

  // OR return a Response to short-circuit the request
  // return new Response('Unauthorized', { status: 401 });
}
```

### Authentication Interruptors

```tsx
export async function requireAuth({ request, ctx }) {
  if (!ctx.user) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/user/login" },
    });
  }
}

export async function requireAdmin({ request, ctx }) {
  if (!ctx?.user?.isAdmin) {
    return new Response(null, {
      status: 302,
      headers: { Location: "/user/login" },
    });
  }
}
```

### Input Validation Interruptor

```tsx
import { z } from "zod";

// Create a reusable validator interruptor
export function validateInput(schema) {
  return async function validateInputInterruptor({ request, ctx }) {
    try {
      const data = await request.json();
      const validated = (ctx.data = schema.parse(data));
    } catch (error) {
      return Response.json(
        { error: "Validation failed", details: error.errors },
        { status: 400 },
      );
    }
  };
}

// Usage example with a Zod schema
const userSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(18).optional(),
});

export const validateUser = validateInput(userSchema);
```

### Logging Interruptor

```tsx
export async function logRequests({ request, ctx }) {
  const start = Date.now();

  // Add a function to the context that will log when called
  ctx.logCompletion: (response) => {
      const duration = Date.now() - start;
      const status = response.status;
      console.log(
        `${request.method} ${request.url} - ${status} (${duration}ms)`,
      );
    },
  };
}

// Usage in a route handler
route('/', [
  logRequests,
  async ({request, ctx}) => {
    // Call the logging function
    ctx.logCompletion(response);
    return Response.json({ success: true });;
  },
]);
```

### Composing Multiple Interruptors

```tsx
import { route } from "rwsdk/router";
import {
  requireAuth,
  validateUser,
  apiRateLimit,
  logRequests,
} from "@/app/interruptors";

// Combine multiple interruptors
route("/api/users", [
    logRequests, // Log all requests
    requireAuth, // Ensure user is authenticated
    validateUser, // Validate user input
    async ({ request, ctx }) => {
      // Handler receives validated data and session from interruptors
      const newUser = await db.user.create({
        data: {
          /* ... */,
          createdBy: ctx.user.userId,
        },
      });

      return Response.json(newUser, { status: 201 });
    },
  ],
});
```

### Role-Based Access Control

```tsx
import { getSession } from "rwsdk/auth";

// Create a function that generates role-based interruptors
export function hasRole(allowedRoles) {
  return async function hasRoleInterruptor({ request, ctx }) {
    const session = await getSession(request);

    if (!session) {
      return Response.redirect("/login");
    }

    if (!allowedRoles.includes(session.role)) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    return { ...ctx, session };
  };
}

// Create specific role-based interruptors
export const isAdmin = hasRole(["ADMIN"]);
export const isEditor = hasRole(["ADMIN", "EDITOR"]);
export const isUser = hasRole(["ADMIN", "EDITOR", "USER"]);
```

### Organization with Co-located Interruptors

Create a file at `./src/app/interruptors.ts`:

```tsx
import { getSession } from "rwsdk/auth";

// Authentication interruptors
export async function requireAuth({ request, ctx }) {
  const session = await getSession(request);

  if (!session) {
    return Response.redirect("/login");
  }

  return { ...ctx, session };
}

// Role-based interruptors
export function hasRole(allowedRoles) {
  return async function hasRoleInterruptor({ request, ctx }) {
    const session = await getSession(request);

    if (!session) {
      return Response.redirect("/login");
    }

    if (!allowedRoles.includes(session.role)) {
      return Response.json({ error: "Unauthorized" }, { status: 403 });
    }

    return { ...ctx, session };
  };
}

export const isAdmin = hasRole(["ADMIN"]);
export const isEditor = hasRole(["ADMIN", "EDITOR"]);

// Other common interruptors
export async function logRequests({ request, ctx }) {
  console.log(`${request.method} ${request.url}`);
  return ctx;
}
```

Then import these interruptors in your route files:

```tsx
// src/app/pages/admin/routes.ts
import { route } from "rwsdk/router";
import { isAdmin, logRequests } from "@/app/interruptors";

import { AdminDashboard } from "./AdminDashboard";
import { UserManagement } from "./UserManagement";

export const routes = [
  route("/", [isAdmin, logRequests, AdminDashboard]),
  route("/users", [isAdmin, logRequests, UserManagement]),
];
```

---
description: RedwoodSDK: Middleware
globs: worker.tsx,middleware.ts,middleware.tsx
alwaysApply: false
---


# RedwoodSDK: Middleware

You're an expert at Cloudflare, TypeScript, and building web apps with RedwoodSDK. Generate high quality **RedwoodSDK middleware** that adhere to the following best practices:

## Guidelines

1. Create focused, single-responsibility middleware functions
2. Organize middleware in dedicated files (e.g., `middleware.ts`, `middleware.tsx`)
3. Use typed parameters and return values
4. Include clear error handling and logging
5. Follow the principle of least privilege
6. Implement proper security headers and CORS policies
7. Optimize for performance with caching strategies

## What is Middleware?

Middleware functions in RedwoodSDK are functions that run on every request before your route handlers. They can:

- Add security headers
- Handle CORS
- Implement caching strategies
- Add request/response logging
- Transform request/response data
- Implement rate limiting
- Add performance monitoring
- Handle error boundaries
- Setup sessions
- Authenticate users

## Example Templates

### Basic Middleware Structure

```tsx
export default defineApp([
  setCommonHeaders(),
  async ({ ctx, request, headers }) => {
    await setupDb(env);
    setupSessionStore(env);
    try {
      // Grab the session's data.
      ctx.session = await sessions.load(request);
    } catch (error) {
      if (error instanceof ErrorResponse && error.code === 401) {
        await sessions.remove(request, headers);
        headers.set("Location", "/user/login");

        return new Response(null, {
          status: 302,
          headers,
        });
      }

      throw error;
    }

    // Populate the ctx with the user's data
    if (ctx.session?.userId) {
      ctx.user = await db.user.findUnique({
        where: {
          id: ctx.session.userId,
        },
      });
    }
  },
  // Route handlers
]);
```

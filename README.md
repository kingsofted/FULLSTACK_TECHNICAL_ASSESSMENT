# Job Application 

## Overview

This project is a full-stack job board application designed to manage and search job listings with advanced filtering and similarity search features. It uses a modern tech stack combining React with Redux on the frontend and Node.js with GraphQL, TypeORM, PostgreSQL, and Elasticsearch on the backend.

---

## Tech Stack

### Frontend
- **React** with **TypeScript** 
- **Redux** 
- **React Hooks** 
- **GraphQL Client** (Apollo Client or equivalent) to interact with GraphQL API

### Backend
- **Node.js** with
- **GraphQL**
- **TypeORM** for Object-Relational Mapping and database migrations
- **PostgreSQL** 
- **Elasticsearch** for advanced full-text search and similarity queries on job listings
- **Migration scripts** to handle schema evolution safely

---

## Features

- CRUD operations for jobs: create, read, update, delete
- Filtering jobs by multiple criteria (title, company, location, experience level, salary range, industry, required skills)
- Full-text search capability via Elasticsearch integration
- Fetch job details and similar job recommendations
- Mark jobs as favorites and retrieve favorite status
- Input validation enforced at GraphQL schema level and backend service layer
- Pagination and sorting on job listings (via filter inputs)
- Type-safe GraphQL queries and mutations
- Asynchronous Processing with Event Listener
---

## Thought Process & Design Decisions

### 1. **Tech Stack Choices**

- **React + TypeScript + Redux (Frontend):**  
  React provides a component-based architecture for robust and type-safe UI development. TypeScript enhances code quality by   enforcing type safety throughout the app. Redux was chosen for global state management (used for filter state).

- **Node.js + TypeScript + GraphQL (Backend):**  
  Node.js offers a scalable runtime environment suitable for real-time and data-intensive APIs. 
- **PostgreSQL + TypeORM:**  
  TypeORM was chosen for its seamless integration with TypeScript and built-in migration tooling, allowing incremental schema   evolution without losing data integrity.

- **Elasticsearch:**  
  To enable powerful full-text search and similarity queries, Elasticsearch was incorporated. 

---

### 2. **Service Layer Abstraction**

- The resolvers delegate business logic to a dedicated `jobService`
- Error handling is centralized in resolvers to catch and re-throw errors with meaningful messages to clients.  

--- 

### 3. **State Management**

- Redux stores filter state to enable consistent and reactive UI behavior 
- This decision helps maintain a single source of truth for filters

---

### 4. **Filtering & Searching**

- The filtering input supports multiple fields and types 
- Search leverages Elasticsearch to deliver fuzzy and full-text search capabilities.  


---

### 5. **Database Migrations**

- TypeORM migrations are used to evolve the database schema safely over time.  
- The migration example dropping a constraint and setting `NOT NULL` on `experience_level` reflects iterative schema design adapting to new requirements and ensure consistency.

---

### 6. **Scalability & Extensibility**

- Modular backend structure (resolvers, services, types) makes the codebase extensible for new features 

---

### 7. **Asynchronous Processing with Event Listener**

- Handle non-critical task asynchronously after the main operation succeeds to increase the processing time and decouple the core request without changing the business logic.

---

### 8. **Security Considerations**

- Authentication and authorization are not yet implemented; this is a critical next step before production deployment.  


---

## Endpoints

> Note: This project uses **GraphQL** API endpoints, so operations are performed via GraphQL queries and mutations on a single endpoint (e.g., `/graphql`).  
> Below are the main GraphQL queries and mutations supported, including input and example responses.

| **Type**   | **Operation**           | **Description**                            | **Input**                                                                                      | **Example Response**                                                                                                                                                  |
|------------|-------------------------|--------------------------------------------|------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Query**  | `getJobs(filter: JobFilterInput!)` | Fetch all jobs matching filter criteria.  | ```graphql { query: "engineer", location: "NY", experienceLevel: "Mid-Level" } ```              | ```json [ { "id": "1", "title": "Software Engineer", "company": "ABC Corp", "location": "NY", "experienceLevel": "Mid-Level", "salaryRange": 85000, "industry": "Tech" } ] ``` |
| **Mutation** | `createJob(input: CreateJobInput!)` | Create a new job entry.                    | ```graphql { input: { title: "DevOps Engineer", company: "NewCo", location: "SF", experienceLevel: "Senior-Level" } } ``` | ```json { "id": "4", "title": "DevOps Engineer", "company": "NewCo", "location": "SF", "experienceLevel": "Senior-Level" } ```                                     

## Future Enhancements

### 1. User Authentication & Authorization
- Integrate user accounts with secure authentication (e.g., JWT, OAuth).
- Implement role-based access to restrict certain mutations 

### 2. Pagination & Cursor-based Navigation
- Add pagination support for job listings to improve performance and user experience when dealing with large datasets.

### 3. In-memory caching layer
- Introduce redis as a cache to improve performance and reduce load on database for frequent queries like popular jobs.
  
### 4. Real-time Updates & Notifications
- Add GraphQL subscriptions or WebSocket support for real-time job postings and updates.
- Notify users about new jobs matching their preferences or changes in saved jobs.


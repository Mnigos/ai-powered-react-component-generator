Create a React web application for generating UI components using AI. The application should have the following core functionalities:

This application uses shadcnui so the components should be taken from there

1. **Component Description Input:** Provide a user interface element (e.g., a textarea or input field) where users can enter a text description detailing the desired UI component.
2. **AI Code Generation:** Integrate with an AI model (you, the AI) that takes the user's text description as input and generates the corresponding React component code. This code should follow standard React functional component practices.
3. **Dynamic Component Preview:** Implement a section that can dynamically render the generated React component code. This preview should update as new code is generated, allowing users to visualize the component without manually adding it to the codebase.
4. **Component Library Persistence:** Develop a system to save the generated component's code (and potentially the original description) to a persistent storage mechanism. This could be a simple file structure or a database.
5. **Browsable Component Library:** Create an interface (e.g., a separate page or section) where users can browse and view components that have been previously generated and saved to the library. Each entry in the library should display the component's code and potentially a small preview.

Consider using modern React practices, such as hooks and functional components, and potentially integrate with a framework like Next.js for server-side rendering or API routes for handling the AI generation and data persistence.

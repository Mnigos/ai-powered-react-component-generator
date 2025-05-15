# AI-Powered React Component Generator

## Getting Started

Install dependencies

```bash
pnpm install
```

Build docker container with postgres database

```bash
pnpm run docker:postgres
```

Run prisma migrations

```bash
pnpm run prisma:migrate:deploy
```

Run developer server

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## About the app

### JS Framework

I Decided to use Nextjs instead of Remix, because I know this technology better and it was easier and faster for me to create this app with Nextjs.

### AI Model

- I decided to use Claude 3.7 Sonnet over Gemini, because I have more experience with it and it's more reliable for me. With Gemini I had some cases where I asked for something and for some reason Gemini skipped it or implemented other things, but forgot about something.
- About the prompts I just described what should be done and what shouldn't and it works fine, but in the future I would play with it a little bit more.

### Solution for components dynamic preview

I decided to go with already existing solution which is Codesandbox's [Sandpack](https://github.com/codesandbox/sandpack). It allows user to edit the code directly in the preview.

### Difficulties

The main issue I had was styling sandpack preview, so maybe in the future I would explore different solutions.

### Ideas for future development

1. Authentication so user will be able to see components that he generated and not only all the generated components
2. Streaming AI responses so user don't have to wait so long seeing only loading screen.
3. Edit the AI response so it includes also a message for the user and not only the code of the generated component.
4. Possibility to fork existing component and adjust it - related to point one.
5. Possibility to use external libraries in generated component.
6. Maybe use ShadcnCLI to install generated components.
7. Improve UI and UX
8. Implement GitHub integration to create PRs with generated components

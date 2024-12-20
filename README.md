# Remix Frontend with EventSource (TypeScript)

This is a **Remix frontend** application built with **TypeScript** that communicates with a **Java MySQL backend** to display real-time data updates using **EventSource**.

The project uses **Remix** as the full-stack framework for the frontend, enabling you to build a fast, scalable user interface with excellent server-side rendering (SSR) capabilities. The frontend fetches real-time updates from the backend using **EventSource**, which is a browser-native feature that allows you to receive server-sent events (SSE) for live data updates.

## Features

- Built with **Remix** and **TypeScript** for a fast, type-safe frontend.
- Real-time updates from the **Java MySQL backend** using **EventSource**.
- Responsive design that adapts to various screen sizes.
- Easy-to-extend architecture, making it easy to add more features or connect to different backends.

## Prerequisites

Before running the project, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (Recommended: v16 or later)
- [npm](https://npmjs.com/) (or [Yarn](https://yarnpkg.com/) if you prefer)
- A **Java MySQL backend** running and configured to send events via EventSource.
- A compatible browser (modern browsers that support EventSource, such as Chrome, Firefox, Safari).

## Installation

Follow these steps to get the project up and running locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repository.git
cd your-repository

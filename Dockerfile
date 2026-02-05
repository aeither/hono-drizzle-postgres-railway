# Use the official Bun image as the base image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /app
COPY . /app

# Install dependencies
RUN bun install --frozen-lockfile

# Expose the port the app runs on
EXPOSE 3000

# Command to run the application
CMD ["/bin/sh", "-c", "bun run migrate && exec bun run src/index.ts"]
# Use the official Node.js image as a base image
FROM node:20

ENV PORT=3001

# Change the working directory on the Docker image to /app
WORKDIR /app

# Copy package.json and package-lock.json to the /app directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of project files into this image
COPY . .

# Expose application port
EXPOSE $PORT

# Start the application
CMD npm run start

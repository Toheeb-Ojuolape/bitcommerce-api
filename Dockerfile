# Use an official Node.js runtime as the base image
FROM node:lts-alpine

# Set the working directory within the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build TypeScript code
RUN npm run build

# Copy data.json from root to the build folder
COPY data.json ./build/data.json

# Expose the port your application will listen on
EXPOSE 8080

# Define the command to run your application
CMD ["node", "build/src/app.js"]

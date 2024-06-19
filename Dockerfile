# Use the official Node.js image from the Docker Hub
FROM node:17.1.0-alpine3.14


# Set the working directory
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port on which the app will run
EXPOSE 3000


# Define the command to run the application
CMD ["node", "star-server.js"]

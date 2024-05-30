# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Define environment variables
ENV MONGODB_URI=mongodb://mongo:27017/db_sean_betest
ENV REDIS_HOST=redis_sean_betest
ENV REDIS_PORT=6379

# Define the command to run the app
CMD ["node", "app.js"]

FROM node:18-alpine

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
# to the /app working directory
COPY package*.json ./

# Install dependencies in /app
RUN npm install

# Copy the rest of our Next.js folder into /app
COPY . .

# Run dev, as we would via the command line
CMD npm run dev
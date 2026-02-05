FROM node:22-slim

RUN mkdir -p /app
WORKDIR /app

# Can get environment variables using docker inspect
ENV test=Hello\ World

# best to put the installation commands first, docker has effective caching
# Copy dependencies first
COPY package.json package-lock.json ./

# RUN npm install, but ci stands for continous integration
# Instructed to omit devDependencies
RUN npm ci --omit=dev 

# THEN copy all project files
COPY . .

# Outside machines can access this specific port
EXPOSE 8080
# npm is the command from the module, run and start are the ARGUMENTS - need to be separate list items
CMD [ "npm", "run", "start" ]



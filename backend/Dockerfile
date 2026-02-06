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

# The EXPOSE instruction doesn't publish the container port.
# it is a type of documentation between the person who builds the image and the person who runs the container, about which ports are intended to be published
# use the -p flag on docker run to publish and map one or more exposed ports to host system
# With docker run [--net=host or --network host], you do not need to specify -p/--expose or -P options - uses the host network namespace instead of its own
EXPOSE 8080
# npm is the command from the module, run and start are the ARGUMENTS - need to be separate list items
CMD [ "npm", "run", "start" ]



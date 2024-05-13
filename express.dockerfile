# Use the official Node.js image as base
FROM node:latest

# Create a directory for the app
WORKDIR /usr/src/app

# Bundle app source
COPY ./cafe-rewards-backend/ .

# Install app dependencies
RUN npm install

# Expose port 3000, which is the default port for Express
EXPOSE 3000

ENV DB_USER=postgres
ENV DB_HOST=postgres
ENV DB_DATABASE=postgres
ENV DB_PASSWORD=Capstone
ENV DB_PORT=5432
ENV DB_DIALECT=postgres
ENV PORT=3000
ENV JWT_SECRET=ThisIsASecret
ENV STRIPE_KEY=sk_test_51Ors4O01PBnNHA0XRwcZVEvHlWebwr3JIO56mX1rItFomlBtn5IRPvGsWdqVNpdl5uhofYx9Itsai2m13IfBJdPY00Kg5MOcYi


# Command to run your Express server
CMD ["node", "app.js"]

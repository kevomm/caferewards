# Use an official Node.js runtime as a parent image
FROM node

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the application code to the working directory
COPY ./cafe-rewards-frontend/caferewards-client/ .

# Install dependencies
RUN npm install

#######################################################
ENV NEXT_PUBLIC_PROD=false
ENV NEXT_PUBLIC_LOGIN_URL_LOCAL=http://localhost:3000/auth/login
ENV NEXT_PUBLIC_LOGIN_URL_PROD=http://172.233.189.185:3000/auth/login
ENV NEXT_PUBLIC_LOGOUT_URL_LOCAL=http://localhost:3000/auth/login
ENV NEXT_PUBLIC_LOGOUT_URL_PROD=http://172.233.189.185:3000/auth/login
ENV NEXT_PUBLIC_SIGNUP_URL_LOCAL=http://localhost:3000/auth/register
ENV NEXT_PUBLIC_SIGNUP_URL_PROD=http://172.233.189.185:3000/auth/register
ENV NEXT_PUBLIC_DASHBOARD_URL_LOCAL=http://localhost:3000/auth/account/dashboard
ENV NEXT_PUBLIC_DASHBOARD_URL_PROD=http://172.233.189.185:3000/auth/account/dashboard
ENV NEXT_PUBLIC_CREATE_CARD_URL_LOCAL_1=http://localhost:3000/auth/account/createcard_request
ENV NEXT_PUBLIC_CREATE_CARD_URL_PROD_1=http://172.233.189.185:3000/auth/account/createcard_request
ENV NEXT_PUBLIC_CREATE_CARD_URL_LOCAL_2=http://localhost:3000/auth/account/createcard_confirm
ENV NEXT_PUBLIC_CREATE_CARD_URL_PROD_2=http://172.233.189.185:3000/auth/account/createcard_confirm
ENV NEXT_PUBLIC_LOCALHOST=http://localhost:3000
ENV NEXT_PUBLIC_SERVERHOST=http://172.233.189.185:3000

# Build the Next.js application
RUN npm run build

# Expose port 3001 to the outside world
EXPOSE 3001

# Define the command to run the Next.js application
CMD ["npm", "start"]

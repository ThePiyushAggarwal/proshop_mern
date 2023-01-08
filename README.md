# ProShop MERN in Redux Toolkit

eCommerce website in MERN stack

[Live deployed link](https://proshopmern-production.up.railway.app/)

[Postman Backend API docs](https://documenter.getpostman.com/view/19789580/VUjSGPrW)

Tech used

- Redux Toolkit
- React.js, Node.js, Mongoose, MongoDB, Express.js
- React Bootstrap
- PayPal API
- Multer for uploading images
- JSON Web Token for authentication

Objective and Functions

- To build a clone of an eCommerce platform.
- Converted whole Redux code into Redux Toolkit as it is the new way of writing Redux
- Products are added to cart and paid for by the Costumers using PayPal.
- They can see their orders all at once. Tweak their profiles. Search for products. Add their address.
- Admins can manage mark the orders as delivered.
- Admins can add products and their images.
- Admins can tweak user details too.
- Admins can make other person admin who will have the same permissions as himself.

## How to Run Locally

- Add a `.env` file to the root of the project.
- Copy and paste `.env.example` file contents into `.env`.
- `PORT` refers to the backend service port. Generally, 5000.
- `NODE_ENV` can have two values `development` and `production`.
- `PAYPAL_CLIENT_ID` is for running the paypal integration in frontend.
- `MONGO_URI` is the MongoDB connection string. **Required.**
- `JWT_SECRET` is the key with JWT does encryption. **Required.**

## Project Images

### Home Page

![Screenshot (44)](https://user-images.githubusercontent.com/27003616/184537305-dd76dfb8-61c7-4b73-ba55-8a5efa34e6ad.png)

### Product Page

![Screenshot (55)](https://user-images.githubusercontent.com/27003616/184537364-774aa46c-463c-4ad5-8c72-90bd4784ce10.png)

### Cart

![Screenshot (45)](https://user-images.githubusercontent.com/27003616/184537322-ee052a05-95c0-4e0a-b79d-6e4f8bd60178.png)

### User Profile

![Screenshot (46)](https://user-images.githubusercontent.com/27003616/184537398-8ed6e938-b750-46d4-b535-994ff64052ca.png)

### Admin Panel Images

![Screenshot (47)](https://user-images.githubusercontent.com/27003616/184537433-2a401b65-b822-4b13-ba0b-1844829aa389.png)
![Screenshot (48)](https://user-images.githubusercontent.com/27003616/184537435-0c2140a6-7dd9-4994-94fa-dde4e14cc481.png)
![Screenshot (57)](https://user-images.githubusercontent.com/27003616/184537730-806533a3-f1f3-4ac8-ac8c-f73341ebd80c.png)

### Paying through PayPal

![Screenshot (51)](https://user-images.githubusercontent.com/27003616/184537468-8b7d220d-c9f9-464a-adc0-94ae4a3c6fe1.png)
![Screenshot (54)](https://user-images.githubusercontent.com/27003616/184537482-a1e688ce-90f4-40a6-af7e-1260441d6753.png)



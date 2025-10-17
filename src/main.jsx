import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*

1.2 Replace `src/App.js` with calculator code
```javascript
import React, { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => setInput(input + value);
  const calculate = () => {
    try {
      setResult(eval(input).toString());
    } catch (error) {
      setResult("Error");
    }
  };
  const clear = () => {
    setInput("");
    setResult("");
  };

  return (
    <div className="App">
      <h1>React Calculator</h1>
      <div className="display">
        <input type="text" value={input} readOnly />
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {"1234567890+-.".split("").map((item) => (
          <button key={item} onClick={() => handleClick(item)}>{item}</button>
        ))}
        <button onClick={calculate}>=</button>
        <button onClick={clear}>C</button>
      </div>
    </div>
  );
}

export default App;
```

### 1.3 Add styles in `src/App.css`
```css
.App {
  text-align: center;
  margin-top: 50px;
}
.display input {
  width: 300px;
  height: 40px;
  font-size: 20px;
  margin-bottom: 10px;
}
button {
  margin: 5px;
  padding: 15px;
  font-size: 20px;
  border: none;
  background-color: lightgray;
  border-radius: 5px;
}
```

### 1.4 Run and test locally
```bash
npm start
```
Your calculator should open on `http://localhost:3000`.

***

## Step 2: Push Code to GitHub

1. Initialize Git:
```bash
git init
git add .
git commit -m "Initial commit - React Calculator"
```

2. Create a new GitHub repository (e.g., `react-calculator-docker`).

3. Connect and push:
```bash
git remote add origin https://github.com/<your-username>/react-calculator-docker.git
git push -u origin main
```

***

## Step 3: Dockerize the React App

### 3.1 Create a `Dockerfile` in the project root
```Dockerfile
# Stage 1: Build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 3.2 Create `.dockerignore`
```
node_modules
build
Dockerfile
.dockerignore
.git
```

### 3.3 Build and run Docker container
```bash
docker build -t react-calculator .
docker run -d -p 3000:80 react-calculator
```
Now access the app at `http://localhost:3000`.

***

## Step 4: Set Up AWS EC2 for Hosting

### 4.1 Launch EC2 Instance
1. Sign in to AWS Console → EC2 → Launch Instance.
2. Choose **Ubuntu 20.04 LTS** AMI.
3. Choose **t2.micro** instance.
4. Configure **Security Group**:
   - Port 22 → SSH
   - Port 80 → HTTP
5. Launch and download your `.pem` key file.

### 4.2 Connect to EC2 Instance
```bash
chmod 400 your-key.pem
ssh -i "your-key.pem" ubuntu@<your-ec2-ip-address>
```

***

## Step 5: Install Docker on EC2
```bash
sudo apt update -y
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
```

***

## Step 6: Deploy the React App on EC2

### Option 1: Clone from GitHub
```bash
sudo apt install git -y
git clone https://github.com/<your-username>/react-calculator-docker.git
cd react-calculator-docker
```

### Option 2: Copy from Local
Use `scp` to upload files:
```bash
scp -i "your-key.pem" -r ./react-calculator ubuntu@<your-ec2-ip>:/home/ubuntu/
```

### Build and Run Docker Image on EC2
```bash
sudo docker build -t react-calculator .
sudo docker run -d -p 80:80 react-calculator
```

### Test
Visit `http://<your-ec2-ip>` in your browser — your calculator should appear live.

***

## Step 7: (Optional) Configure Domain with Nginx Reverse Proxy
If using a custom domain, point DNS to your EC2 public IP and install Nginx:
```bash
sudo apt install nginx -y
sudo systemctl enable nginx
sudo systemctl start nginx
```

Then copy your deployed static files to `/var/www/html` or configure an Nginx reverse proxy for `localhost:80`.

***

This completes the full deployment workflow:
1. React app built and tested locally  
2. Dockerized  
3. Hosted on AWS EC2  
*/

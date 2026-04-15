# 🎨 AI Image Generator

An AI-powered web application that generates images from text prompts using modern AI models via API integration. Users can enter a description and instantly receive AI-generated images.

---

## 🚀 Features

- 🧠 Generate images from text prompts  
- ⚡ Fast AI image generation  
- 🖼️ Display generated images in real time  
- 💾 Save image history for each user  
- 🔐 Authentication system (login / register)  
- 📱 Responsive design (mobile + desktop)  
- ☁️ Backend API integration with AI model  

---

## 🛠️ Tech Stack

### Frontend
- React.js  
- Axios  
- Context API  
- Tailwind CSS  
- React Toastify  

### Backend
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT Authentication  
- Cookies (httpOnly)  
- Replicate AI API  

### AI Service
- Replicate AI (Text-to-Image models)  

---

## 🧠 How It Works

1. User enters a text prompt (e.g. "a cat flying in space")  
2. Frontend sends request to backend API  
3. Backend calls AI model via Replicate  
4. AI generates an image  
5. Image URL is returned to frontend  
6. Image is displayed and saved in user history  

---

## 📦 Installation

### 1. Clone the repository
```bash
git clone https://github.com/your-username/ai-image-generator.git

2. Install dependencies
Backend
cd backend
npm install
Frontend
cd frontend
npm install

3. Setup environment variables

Create a .env file in the backend:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_SECRET_REFRESH=your_refresh_secret
REPLICATE_API_TOKEN=your_replicate_token

4. Run the project
Start backend
npm start
Start frontend
npm run dev
💡 Future Improvements
🎥 Text-to-video generation
🎤 AI voice generation
🧠 ChatGPT-like assistant
☁️ Cloud storage for images (Cloudinary / AWS)
📊 User dashboard analytics
👨‍💻 Author
GitHub: https://github.com/your-username
Project: AI Image Generator
⭐ Support

If you like this project, please give it a ⭐ on GitHub!

<img width="1920" height="1080" alt="Screenshot (120)" src="https://github.com/user-attachments/assets/8b4b2d38-9261-47a8-abeb-5a629a338d9a" />


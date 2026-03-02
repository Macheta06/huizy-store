Huizy is a full-stack MERN application designed to bridge the gap between sustainable consumption and waste management. It offers an e-commerce platform for eco-friendly products (soaps and cosmetics) while managing a logistics system for used cooking oil collection in Manizales, Colombia.

🚀 Key Features
E-commerce Engine: Full product catalog with dynamic categories and multiple presentations (variants).

Secure Checkout: WhatsApp-integrated checkout with backend price recalculation and ACID transactions.

Logistics Management: Public form for scheduling used oil collection with anti-spam rate limiting.

Admin Dashboard: Secure back-office to manage products, inventory, and collection requests.

Authentication: Role-based access control (RBAC) using JWT and encrypted passwords.

Inventory Control: Atomic stock updates to prevent race conditions during purchases.

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, React Router, Context API.

Backend: Node.js (ES Modules), Express.js.

Database: MongoDB Atlas (Mongoose ODM).

Security: JWT (JSON Web Tokens), Bcrypt.js, Express Rate Limit.

⚙️ Installation & Setup
Follow these steps to run the project locally.

1. Prerequisites
Node.js (v16+)

npm or yarn

MongoDB Atlas account or local MongoDB instance

2. Clone the Repository
Bash
git clone https://github.com/your-username/somos-huizy.git
cd somos-huizy
3. Backend Configuration
Navigate to the server folder: cd server

Install dependencies: npm install

Create a .env file in the root of the /server folder:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
Start the server: npm start

4. Frontend Configuration
Navigate to the client folder: cd ../client

Install dependencies: npm install

Create a .env file in the root of the /client folder:

VITE_API_URL=http://localhost:5000
VITE_WHATSAPP_NUMBER=573146042169
Start the app: npm run dev


👤 Author
Andrés - Systems Engineer

LinkedIn: [Your Profile]

GitHub: [@your-username]

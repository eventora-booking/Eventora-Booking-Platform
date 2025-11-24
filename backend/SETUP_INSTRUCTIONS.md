# 🔧 Backend Setup Instructions

## ✅ `.env` File Created!

I've created the `.env` file for you. **Now you need to fill in your actual values:**

---

## 📝 **Step 1: Update MongoDB Connection String**

1. Go to **MongoDB Atlas**: https://cloud.mongodb.com
2. Click **"Connect"** on your cluster
3. Choose **"Connect your application"**
4. Copy the connection string
5. Replace `<password>` with your actual database password
6. **Add `/eventora` before the `?` in the URL**

**Example:**
```
Before: mongodb+srv://user:<password>@cluster0.abc.mongodb.net/?retryWrites=true&w=majority
After:  mongodb+srv://user:yourpassword@cluster0.abc.mongodb.net/eventora?retryWrites=true&w=majority
```

7. Open `backend/.env` file
8. Replace the `MONGO_URI` line with your actual connection string

---

## 🔑 **Step 2: Update JWT Secret (Optional but Recommended)**

The JWT_SECRET is already set, but you can change it to something more secure:

1. Open `backend/.env`
2. Change `JWT_SECRET` to a random string (at least 32 characters)
3. Example: `JWT_SECRET=my-super-secret-key-12345-abcdef-67890`

---

## ✅ **Step 3: Start the Server**

```bash
cd backend
npm run dev
```

**You should see:**
```
✅ MongoDB Connected: cluster0.xxxxx.mongodb.net
📊 Database: eventora
🚀 Server running on port 5000
```

---

## 🎯 **Quick Test**

1. Open browser: `http://localhost:5000`
2. Should see: `{"success":true,"message":"Welcome to Eventora API"}`

If you see this, backend is working! ✅

---

## ⚠️ **Important Notes**

- **Never commit `.env` file to Git** - it contains secrets
- **Keep your MongoDB password secure**
- **Make sure MongoDB Atlas allows your IP** (Network Access settings)

---

## 🆘 **Troubleshooting**

### "MongoDB Connection Error"
- Check your `MONGO_URI` in `.env` file
- Make sure password is correct
- Verify IP is whitelisted in MongoDB Atlas

### "Port 5000 already in use"
- Something else is using port 5000
- Change `PORT=5000` to `PORT=5001` in `.env`

### "Cannot find module"
- Run `npm install` in backend folder

---

**Once you update the `MONGO_URI` with your actual connection string, everything should work!** 🚀


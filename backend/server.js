const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');
const UserRoutes = require('./routes/UserRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); 

// DB connection
mongoose.connect(process.env.MONGO_URI,
   {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users',UserRoutes)

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

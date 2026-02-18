import express from 'express';
import cors from 'cors';

const app = express();

// 1. Enable CORS so your React app (on a different port) can access this data
app.use(cors());

// 2. The "Live Data" Logic
const getFluctuatedStats = () => {
  const fluctuate = (base, range) => {
    const change = (Math.random() * range * 2) - range;
    return base + change;
  };

  return {
    revenue: `$${fluctuate(23569, 500).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    sales: Math.floor(fluctuate(3435, 50)).toString(),
    customers: Math.floor(fluctuate(1245, 10)).toString(),
    bounce: `${fluctuate(47.0, 1.5).toFixed(1)}%`,
    trend: Math.random() > 0.5 ? 'up' : 'down',
    timestamp: new Date().toLocaleTimeString() 
  };
};

// 3. API Route
app.get('/api/stats', (req, res) => {
  res.json(getFluctuatedStats());
});

// 4. Export for Serverless or Listen for Local Dev
if (process.env.NODE_ENV !== 'production') {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`🚀 LiveSphere Backend running at http://localhost:${PORT}/api/stats`);
  });
}

export default app;
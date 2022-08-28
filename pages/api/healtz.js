// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

// Health check route
export default function handler(req, res) {
  res.status(200).json({ name: 'OK' })
}

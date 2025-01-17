import jwt from 'jsonwebtoken';

// middleware to validate token
const checkToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Acesso Negado!' });
  }

  try {
    const verified = jwt.verify(token, 'nossosecret');
    req.user = verified;
    next();
  } catch (error) {
    return res.status(400).json({ message: 'Token Inválido!' });
  }
};

export default checkToken;

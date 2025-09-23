// server/routes/auth.routes.js

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model.js');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'El correo electrónico ya está en uso' });
    }

    user = new User({ name, email, password });
    await user.save();
    res.status(201).json({ message: 'Usuario registrado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const payload = {
            user: {
                id: user.id,
                name: user.name,
            },
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // Necesitaremos una "palabra secreta"
            { expiresIn: '5h' }, // El token expira en 5 horas
            (err, token) => {
                if (err) throw err;
                res.json({ token }); // Enviamos el token al cliente
            }
        );

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
});


module.exports = router;
import express from 'express';
export default function handler(req, res) {
  res.json({ express: typeof express });
}
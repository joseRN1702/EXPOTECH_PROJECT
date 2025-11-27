import React, { useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, Outlet, Navigate } from "react-router-dom";
import "./App.css";
import BackgroundCanvas from "./components/BackgroundCanvas";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forgot from "./pages/Forgot";
import RequirementDetail from "./pages/RequirementDetail";
import Chat from "./pages/Chat";

function Layout() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <BackgroundCanvas />

      <main
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100% - 64px)",
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default function App() {
  const canvasRef = useRef(null);

  useEffect(() => {
    document.title = "Rede Neural Fullscreen";
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    const DPR = window.devicePixelRatio || 1;

    function resize() {
      c.width = Math.floor(window.innerWidth * DPR);
      c.height = Math.floor(window.innerHeight * DPR);
      c.style.width = window.innerWidth + "px";
      c.style.height = window.innerHeight + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    }
    window.addEventListener("resize", resize);
    resize();

    const N = 125;
    const P = [];
    const R = 100;
    for (let i = 0; i < N; i++) {
      P.push({
        x: Math.random() * (c.width / DPR),
        y: Math.random() * (c.height / DPR),
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      });
    }

    let m = { x: c.width / DPR / 2, y: c.height / DPR / 2 };
    function onMove(e) {
      m.x = e.clientX;
      m.y = e.clientY;
    }
    window.addEventListener("mousemove", onMove);

    function cor(x, alpha = 1) {
      const f = x / (c.width / DPR);
      const r = Math.floor(204 * (1 - f) + 0 * f);
      const g = Math.floor(0 * (1 - f) + 247 * f);
      const b = 255;
      return `rgba(${r},${g},${b},${alpha})`;
    }

    let rafId;
    function loop() {
      ctx.fillStyle = "rgba(0, 8, 20, 0.06)";
      ctx.fillRect(0, 0, c.width / DPR, c.height / DPR);

      for (const p of P) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > c.width / DPR) p.vx *= -1;
        if (p.y < 0 || p.y > c.height / DPR) p.vy *= -1;
      }

      ctx.lineWidth = 1;
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const dx = P[j].x - P[i].x,
            dy = P[j].y - P[i].y;
          const d = Math.hypot(dx, dy);
          if (d < 150) {
            ctx.globalAlpha = 1 - d / 150;
            ctx.beginPath();
            ctx.moveTo(P[i].x, P[i].y);
            ctx.lineTo(P[j].x, P[j].y);
            ctx.strokeStyle = cor((P[i].x + P[j].x) / 2, 0.45);
            ctx.stroke();
          }
        }

        const dx = m.x - P[i].x,
          dy = m.y - P[i].y;
        const d = Math.hypot(dx, dy);
        if (d < R) {
          const f = (R - d) / R;
          P[i].x -= dx * f * 0.03;
          P[i].y -= dy * f * 0.03;
        }
      }

      ctx.globalAlpha = 1;
      for (const p of P) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4, 0, Math.PI * 2);
        ctx.fillStyle = cor(p.x);
        ctx.fill();
      }

      rafId = requestAnimationFrame(loop);
    }

    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot" element={<Forgot />} />
          <Route path="chat" element={<Chat />} />
          <Route path="requirement/:id" element={<RequirementDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

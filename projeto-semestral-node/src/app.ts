import express from "express";
import path from "path";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(express.json());
// Enable CORS for local development (client runs on different port)
app.use(cors());
app.use(routes);

// Serve React build in production
if (process.env.NODE_ENV === "production") {
	const clientBuildPath = path.join(__dirname, "..", "client", "build");
	app.use(express.static(clientBuildPath));
	app.get("*", (req, res) => {
		res.sendFile(path.join(clientBuildPath, "index.html"));
	});
}

export default app;

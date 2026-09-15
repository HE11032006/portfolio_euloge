import { spawn } from "node:child_process";
import net from "node:net";
import path from "node:path";

function portIsAvailable(port) {
  return new Promise((resolve) => {
    const tester = net.createServer();
    tester.once("error", () => resolve(false));
    tester.once("listening", () => tester.close(() => resolve(true)));
    tester.listen(port, "127.0.0.1");
  });
}

const preferredPort = Number(process.env.PORT || 3000);
const url = `http://localhost:${preferredPort}/admin`;
const nextBin = path.join(process.cwd(), "node_modules", "next", "dist", "bin", "next");

const openBrowser = (targetUrl) => {
  if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", "", targetUrl], { detached: true, stdio: "ignore" }).unref();
  } else if (process.platform === "darwin") {
    spawn("open", [targetUrl], { detached: true, stdio: "ignore" }).unref();
  } else {
    spawn("xdg-open", [targetUrl], { detached: true, stdio: "ignore" }).unref();
  }
};

if (!(await portIsAvailable(preferredPort))) {
  try {
    const response = await fetch(url);
    if (response.ok) {
      console.log(`Le serveur Next.js existe déjà. Ouverture de ${url}`);
      openBrowser(url);
      process.exit(0);
    }
  } catch {
    // The occupied port is not responding as this project's dev server.
  }
  throw new Error(`Le port ${preferredPort} est occupé par une autre application.`);
}

const server = spawn(process.execPath, [nextBin, "dev", "-H", "127.0.0.1", "-p", String(preferredPort)], {
  cwd: process.cwd(),
  env: { ...process.env, LOCAL_CONTENT_ADMIN: "1" },
  stdio: "inherit",
});

setTimeout(() => openBrowser(url), 1800);
server.on("exit", (code) => process.exit(code ?? 0));
process.on("SIGINT", () => server.kill("SIGINT"));
process.on("SIGTERM", () => server.kill("SIGTERM"));

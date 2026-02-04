// import express from "express";
// import cors from "cors";
// import { exec } from "child_process";

// const app = express();
// app.use(cors());
// app.use(express.json());

// app.post("/run", (req, res) => {
//   const { code } = req.body;

//   if (!code || code.trim() === "") {
//     return res.json({ success: false, output: "There is an error" });
//   }

//   const command = `node -e "${code.replace(/"/g, '\\"')}"`;

//   exec(command, { timeout: 2000, maxBuffer: 1024 * 1024 }, (error, stdout, stderr) => {
//     if (error || stderr) {
//       return res.json({ success: false, output: "There is an error" });
//     }

//     if (!stdout.trim()) {
//       return res.json({ success: false, output: "There is an error" });
//     }

//     return res.json({
//       success: true,
//       output: stdout
//     });
//   });
// });

// app.listen(5000, () => console.log("Compiler API running at http://localhost:5000"));


// backend/index.js
import express from "express";
import cors from "cors";
import { exec } from "child_process";
import fs from "fs";
import path from "path";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

const TMP_DIR = "./tmp";

if (!fs.existsSync(TMP_DIR)) {
  fs.mkdirSync(TMP_DIR);
}

app.post("/run", (req, res) => {
  const { code } = req.body;

  if (!code || code.trim() === "") {
    return res.json({ success: false, output: "There is an error" });
  }

  // Generate safe random filename
  const filename = crypto.randomBytes(6).toString("hex") + ".js";
  const filepath = path.join(TMP_DIR, filename);

  // Wrap user code safely
  const wrappedCode = `
try {
${code}

} catch (err) {
  console.log("RUNTIME_ERROR");
}
`;

  fs.writeFileSync(filepath, wrappedCode);

  exec(`node ${filepath}`, { timeout: 2000 }, (error, stdout, stderr) => {
    fs.unlinkSync(filepath); // cleanup

    if (error || stderr || !stdout.trim()) {
      return res.json({ success: false, output: "There is an error" });
    }

    return res.json({
      success: true,
      output: stdout
    });
  });
});

app.listen(5000, () => console.log("Compiler API running at http://localhost:5000"));

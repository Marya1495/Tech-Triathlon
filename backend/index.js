// index.js
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
if (!fs.existsSync(TMP_DIR)) fs.mkdirSync(TMP_DIR);

/* ---------------- QUESTION TEST BANK ---------------- */

const TESTS = {
  1: { fn: "calculateGrade", cases: [90, 85, 70] }, // ✅ FIXED
  2: { fn: "sumEvens", cases: [[1,2,3,4], [10,15,20]] },
  3: { fn: "reverse", cases: ["hello", "Code"] },
  4: { fn: "user.isAdult", cases: [] },
  5: { fn: "fizzBuzz", cases: [15, 3, 5] },
  6: { fn: "getData", cases: ["api/user", "api/error"] }
};

const EXPECTED_OUTPUTS = {
  1: ["A", "B", "F"],
  2: ["6", "30"],
  3: ["olleh", "edoC"],
  4: ["false", "true"],
  5: ["FizzBuzz", "Fizz", "Buzz"],
  6: ["John", "Error Caught"]
};

/* ---------------- RUN ENDPOINT ---------------- */

app.post("/run", (req, res) => {
  const { code, questionId } = req.body;

  if (!code || !TESTS[questionId]) {
    return res.json({ success: false, output: [] });
  }

  const filename = crypto.randomBytes(6).toString("hex") + ".js";
  const filepath = path.join(TMP_DIR, filename);
  const test = TESTS[questionId];

  let runner = "";

  if (questionId === 4) {
    runner = `
      user.age = 17;
      console.log(user.isAdult());
      user.age = 18;
      console.log(user.isAdult());
    `;
  } else if (questionId === 6) {
    runner = `
      (async () => {
        try {
          console.log(await getData("api/user"));
          await getData("api/error");
        } catch {
          console.log("Error Caught");
        }
      })();
    `;
  } else {
    runner = test.cases
      .map(arg => `console.log(${test.fn}(${JSON.stringify(arg)}));`)
      .join("\n");
  }

  const wrappedCode = `
${code}

try {
${runner}
} catch {
  console.log("ERROR");
}
`;

  fs.writeFileSync(filepath, wrappedCode);

  exec(`node ${filepath}`, { timeout: 2000 }, (error, stdout, stderr) => {

    // ✅ SAFE CLEANUP
    try {
      fs.unlinkSync(filepath);
    } catch {}

    // ✅ HARD SAFETY GUARD
    // if (error || stderr || !stdout) {
    //   return res.json({ success: false, output: [] });
    // }

    // const actualOutput = stdout
    //   .trim()
    //   .split("\n")
    //   .map(line => line.trim());
    if (error || stderr || stdout === undefined || stdout === null) {
      return res.json({ success: false, output: [] });
    }

    const outputString = String(stdout);

    if (!outputString.trim()) {
      return res.json({ success: false, output: [] });
    }

    const actualOutput = outputString
      .trim()
      .split("\n")
      .map(line => line.trim());

    const expected = EXPECTED_OUTPUTS[questionId];

    const isCorrect =
      expected &&
      actualOutput.length === expected.length &&
      actualOutput.every((val, idx) => val === expected[idx]);

    if (!stdout.trim() || stdout.includes("ERROR") || !isCorrect) {
      return res.json({
        success: false,
        output: actualOutput
      });
    }

    return res.json({
      success: true,
      output: actualOutput
    });
  });
});

app.listen(5000, () =>
  console.log("Compiler API running at http://localhost:5000")
);
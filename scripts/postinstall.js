const fs = require("fs");

const isDevClient = process.env.EAS_BUILD_PROFILE !== "production";

if (!isDevClient) {
  console.log("🚫 Removing expo-dev-client for production build...");

  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));

  if (packageJson.dependencies && packageJson.dependencies["expo-dev-client"]) {
    delete packageJson.dependencies["expo-dev-client"];
    fs.writeFileSync("package.json", JSON.stringify(packageJson, null, 2));
    console.log("✅ expo-dev-client removed from dependencies.");
  } else {
    console.log("ℹ️ expo-dev-client not found in dependencies.");
  }
}

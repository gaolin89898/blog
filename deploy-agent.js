const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function deploy({ password, host, user, remotePath }) {
  try {
    if (!host || !user || !remotePath) {
      console.error(
        "错误：deploy-config.json 缺少 host / user / remotePath 配置（该文件不入仓库，仅在本地维护）"
      );
      process.exit(1);
    }

    console.log("开始提交代码...");
    // 检查是否有未提交的更改
    const statusOutput = execSync("git status --porcelain", { encoding: "utf8" });
    
    if (statusOutput.trim() !== "") {
      // 有未提交的更改，执行提交
      execSync("git add .", { stdio: "inherit" });
      execSync("git commit -m '自动提交：部署前的更改'", { stdio: "inherit" });
      console.log("代码提交完成！");
    } else {
      console.log("没有未提交的更改，跳过提交步骤。");
    }
    
    console.log("开始构建项目...");
    // 运行构建命令
    execSync("npm run build", { stdio: "inherit" });

    console.log("构建完成，开始部署...");

    // 构建后的目录路径
    const distPath = path.join(__dirname, "dist");

    // 检查 dist 目录是否存在
    if (!fs.existsSync(distPath)) {
      console.error("错误：构建目录不存在，请先运行构建命令");
      return;
    }

    // 执行 scp 命令，将 dist 下的所有文件传输到远程服务器
    console.log("正在传输文件到远程服务器...");
    
    // 使用 WSL 执行 scp 命令
    console.log("使用 WSL 执行部署...");
    // 将 Windows 路径转换为 WSL 路径
    const wslDistPath = execSync(`wsl wslpath -a "${distPath}"`, { encoding: "utf8" }).trim();
    
    let scpCommand;
    const target = `${user}@${host}:${remotePath}/`;
    if (password) {
      // 使用 WSL 中的 sshpass 传递密码
      scpCommand = `wsl sshpass -p "${password}" scp -r -o StrictHostKeyChecking=no "${wslDistPath}"/\* ${target}`;
    } else {
      // 不使用密码，需要手动输入
      scpCommand = `wsl scp -r -o StrictHostKeyChecking=no "${wslDistPath}"/\* ${target}`;
    }
    
    execSync(scpCommand, {
      stdio: "inherit",
    });

    console.log("部署完成！");
  } catch (error) {
    console.error("部署失败：", error.message);
    process.exit(1);
  }
}

// 解析命令行参数
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === "--password" || args[i] === "-p") {
      options.password = args[i + 1];
      i++;
    }
  }
  
  return options;
}

// 执行部署
if (require.main === module) {
  const configPath = path.join(__dirname, "deploy-config.json");

  let config = {};
  if (fs.existsSync(configPath)) {
    try {
      config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    } catch (error) {
      console.error("读取配置文件失败：", error.message);
    }
  } else {
    console.error("错误：未找到 deploy-config.json（已不入仓库，需在本地创建）");
  }

  // 命令行参数中的密码优先于配置文件
  const options = parseArgs();
  if (options.password) {
    config.password = options.password;
  }

  deploy(config);
}

module.exports = deploy;

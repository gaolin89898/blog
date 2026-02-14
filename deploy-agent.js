const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function deploy(password) {
  try {
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
    
    let scpCommand;
    if (password) {
      try {
        // 尝试使用 WSL 中的 sshpass
        console.log("尝试使用 WSL 中的 sshpass...");
        // 将 Windows 路径转换为 WSL 路径
        const wslDistPath = execSync(`wsl wslpath -a "${distPath}"`, { encoding: "utf8" }).trim();
        // 使用 WSL 命令执行 scp，添加 -o 选项跳过主机密钥验证
        scpCommand = `wsl sshpass -p "${password}" scp -r -o StrictHostKeyChecking=no "${wslDistPath}"/\* root@8.162.12.148:/var/www/blog/`;
      } catch (error) {
        try {
          // 检查系统中的 sshpass 是否可用
          execSync("sshpass --version", { stdio: "ignore" });
          // 使用系统中的 sshpass 命令传递密码
          scpCommand = `sshpass -p "${password}" scp -r -o StrictHostKeyChecking=no "${distPath}\*" root@8.162.12.148:/var/www/blog/`;
        } catch (error) {
          // sshpass 不可用，提示用户并使用普通 scp 命令
          console.warn("sshpass 工具不可用，将使用普通 scp 命令，请手动输入密码。");
          console.warn("建议安装 sshpass 工具以实现自动化部署。");
          scpCommand = `scp -r -o StrictHostKeyChecking=no "${distPath}\*" root@8.162.12.148:/var/www/blog/`;
        }
      }
    } else {
      // 不使用密码，需要手动输入
      scpCommand = `scp -r -o StrictHostKeyChecking=no "${distPath}\*" root@8.162.12.148:/var/www/blog/`;
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
  let password;
  
  // 首先尝试从命令行参数获取密码
  const options = parseArgs();
  if (options.password) {
    password = options.password;
  } else {
    // 然后尝试从配置文件获取密码
    const configPath = path.join(__dirname, "deploy-config.json");
    if (fs.existsSync(configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
        password = config.password;
      } catch (error) {
        console.error("读取配置文件失败：", error.message);
      }
    }
  }
  
  deploy(password);
}

module.exports = deploy;

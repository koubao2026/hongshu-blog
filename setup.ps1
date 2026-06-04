# 红薯品桌游博客 - 一键部署脚本
# 使用方法：下载整个 hongshu-blog 文件夹，在文件夹内右键打开 PowerShell，运行：
#   .\setup.ps1
# 或者手动执行：
#   npm install
#   npm run dev

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "  🎲 红薯品桌游博客 - 一键部署" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""

# 检查 Node.js
$nodeVersion = node --version 2>$null
if (-not $nodeVersion) {
    Write-Host "❌ 未检测到 Node.js，请先安装 v18+ : https://nodejs.org" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js $nodeVersion" -ForegroundColor Green

# 安装依赖
Write-Host ""
Write-Host "[1/2] 安装依赖（首次可能需要2-3分钟）..." -ForegroundColor Yellow
npm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ 依赖安装失败" -ForegroundColor Red
    exit 1
}
Write-Host "✅ 依赖安装完成" -ForegroundColor Green

# 构建验证
Write-Host ""
Write-Host "[2/2] 构建验证..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️ 构建有错误，尝试开发模式..." -ForegroundColor Yellow
} else {
    Write-Host "✅ 构建成功" -ForegroundColor Green
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Green
Write-Host "  🎉 安装完成！" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ""
Write-Host "启动开发服务器：" -ForegroundColor Cyan
Write-Host "  npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "打开浏览器访问：" -ForegroundColor Cyan
Write-Host "  http://localhost:3000" -ForegroundColor White
Write-Host ""

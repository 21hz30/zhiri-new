# 值日排班日历系统

这是一个用于查看和管理值日排班情况的日历应用。

## 功能特点

- 📅 值日排班表显示 - 查看每周值日组安排
- 👥 8个值日组（每组3人）管理
- ✅ 考勤状态记录（已到/缺席/不合格）
- 📊 考核评分系统和惩罚机制
- 🔍 详细的统计分析
- 👮‍♂️ 管理员权限控制
- 📱 响应式设计，支持移动端和桌面端

## 技术栈

- React 18
- Next.js 14
- TypeScript
- TailwindCSS
- date-fns
- react-big-calendar

## 安装步骤

1. 克隆项目
```bash
git clone [项目地址]
cd [项目目录]
```

2. 安装依赖
```bash
npm install
```

3. 运行开发服务器
```bash
npm run dev
```

4. 打开浏览器访问 http://localhost:3000

## 管理员账号111

系统内置一个终端管理员账号:
- 用户名: ZRWY
- 密码: GL

终端管理员可以添加或删除其他管理员账号。

## 项目结构

```
src/
├── components/            # 组件目录
│   ├── AttendanceModal.tsx      # 考勤评分弹窗
│   ├── LoginModal.tsx           # 登录弹窗
│   ├── RecordDetailModal.tsx    # 记录详情弹窗
│   ├── CalendarView.tsx         # 日历视图组件
│   ├── CustomEvent.tsx          # 自定义日历事件组件
│   ├── WeekendEvent.tsx         # 周末事件组件
│   ├── ConfirmModal.tsx         # 确认弹窗组件
│   ├── SubstitutionInfo.tsx     # 代值日信息组件
│   ├── WeekSelector.tsx         # 周选择器组件
│   ├── DutyCalendar.tsx         # 值日日历组件
│   ├── AdminManagement.tsx      # 管理员管理组件
│   ├── LowScoreWarning.tsx      # 低分警告组件
│   └── ChangePasswordModal.tsx  # 修改密码弹窗
├── config/               # 配置文件
├── data/                # 数据文件
│   ├── admins.ts        # 管理员数据
│   ├── groups.ts        # 值日组数据
│   └── dutyStatus.ts    # 值日状态数据
├── pages/               # 页面文件
│   ├── _app.tsx         # 应用入口
│   ├── index.tsx        # 首页（排班表）
│   ├── statistics.tsx   # 统计页面
│   └── admin-management.tsx # 管理员管理页面
├── styles/              # 样式文件
│   └── globals.css      # 全局样式
├── types/               # 类型定义
│   └── index.ts         # 类型声明文件
└── types.ts             # 全局类型定义
```

## 功能说明

1. 值日排班表
   - 显示每周值日组安排
   - 查看每天值日人员
   - 记录考勤状态
   - 支持周末和额外值日安排

2. 考核评分
   - 记录出勤状态（已到/缺席/不合格）
   - 评分系统（1-10分）
   - 惩罚值日天数设置
   - 支持代值日和换值日记录
   - 备注信息

3. 统计分析
   - 按组别筛选
   - 查看平均分
   - 出勤统计
   - 惩罚天数统计
   - 代值日统计
   - 详细记录查看

4. 管理员功能
   - 管理员登录
   - 添加/删除管理员账号
   - 修改密码
   - 调整值日组排班
   - 添加额外值日人员

## 使用的颜色

- 蓝色（主题色）：#2a63b7
- 红色（警告色）：#ff2300
- 绿色（成功色）：#00bd39

## 数据存储

- 所有数据存储在浏览器的localStorage中
- 包括考勤记录、排班调整、管理员账号等信息
- 清除浏览器缓存会导致数据丢失
- 适合本地使用，生产环境建议对接后端数据库

## 浏览器支持

- Chrome (推荐)
- Firefox
- Safari
- Edge

## 部署说明

### 1. Vercel 部署（推荐）

最简单的部署方式，特别适合 Next.js 项目：

1. 在 [Vercel](https://vercel.com) 注册账号并登录
2. 将代码推送到 GitHub 仓库
   ```bash
   git add .
   git commit -m "准备部署"
   git push origin master   # 或者 main，取决于你的默认分支
   ```
3. 在 Vercel 控制面板中点击 "New Project"
4. 导入你的 GitHub 仓库
5. 配置部署设置:
   - Framework Preset: Next.js
   - Build Command: 保持默认 (`npm run build`)
   - Output Directory: 保持默认 (`.next`)
   - Install Command: `npm install`
6. 点击 "Deploy" 按钮
7. Vercel 会自动构建和部署项目，完成后会提供一个域名

如果需要绑定自定义域名:
1. 在项目设置中找到 "Domains" 选项
2. 添加你的自定义域名
3. 按照提示在你的域名服务商处配置DNS记录

#### Vercel部署常见问题

1. **构建失败**
   - 确保项目能在本地成功构建 (`npm run build`)
   - 检查TypeScript错误，修复所有类型错误
   - 确保导入路径正确（区分大小写）

2. **路径问题**
   - 使用相对路径或以`/`开头的绝对路径
   - 确保引用的文件和目录名称与实际文件系统大小写完全匹配

3. **环境变量**
   - 如果使用了环境变量，确保在Vercel项目设置中添加了相应的环境变量

4. **API路由问题**
   - 如果在开发环境中使用了API路由，确保在生产环境中也能正常工作
   - API路由在Vercel上会自动转换为Serverless Functions

5. **浏览器缓存问题**
   - 部署后如果看到旧内容，尝试清除浏览器缓存或使用无痕模式访问

### 2. 静态文件部署 (Github Pages, Nginx, Apache等)

如果需要将项目部署为静态网站：

1. 修改 `next.config.js` 文件，将 `output: 'standalone'` 改为 `output: 'export'`

2. 构建并导出项目
```bash
npm run build
```

3. 生成的静态文件位于 `out` 目录中，可以直接部署到任何静态网站托管服务

4. 对于 GitHub Pages:
   - 将 `out` 目录中的内容推送到 gh-pages 分支
   - 或使用 GitHub Actions 自动部署

5. 对于其他静态文件服务器 (如 Nginx)，直接将 `out` 目录中的文件复制到网站根目录

### 3. 自有服务器部署

1. 构建项目
```bash
npm run build
```

2. 使用 PM2 运行（需要先安装 PM2：`npm install -g pm2`）
```bash
pm2 start npm --name "duty-system" -- start
```

3. 配置 Nginx 反向代理
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## 注意事项

- 由于使用了 localStorage 存储数据，数据不会丢失，但仅限于同一浏览器
- 建议定期备份数据（可以通过导出功能）
- 密码以明文形式存储，实际生产环境应加密处理
- 响应式设计适配各种屏幕尺寸，但建议在桌面设备上使用获得最佳体验




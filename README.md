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

1. 在 [Vercel](https://vercel.com) 注册账号
2. 将代码推送到 GitHub 仓库
3. 在 Vercel 中导入该 GitHub 仓库
4. Vercel 会自动部署，并提供一个域名

### 2. 自有服务器部署

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




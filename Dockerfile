# 使用官方 Node.js 的 Alpine 版本作为基础镜像
FROM node:latest as builder

# 设置容器内的工作目录。所有后续命令都会在这个目录中执行。
WORKDIR /app

# 首先只复制 package.json 和 package-lock.json (如果存在)
COPY package*.json ./
# COPY package.json ./

# 设置一下镜像源
RUN npm config set registry http://mirrors.cloud.tencent.com/npm/

# 安装项目依赖
RUN npm install

# 复制项目的其他所有文件到容器中
COPY . .

# 构建应用
RUN npm run build

# 使用 Nginx 的 Alpine 版本作为运行时的基础镜像
FROM nginx:stable-alpine

# 将构建出的文件从构建阶段复制到 Nginx 容器的服务目录
COPY --from=builder /app/dist /usr/share/nginx/html

# 将自定义的 Nginx 配置文件复制到容器中
COPY nginx.conf /etc/nginx/nginx.conf

# 暴露端口 80
EXPOSE 80

# 启动 Nginx 以保持前台运行
CMD ["nginx", "-g", "daemon off;"]

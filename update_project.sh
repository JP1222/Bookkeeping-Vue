# 从Git仓库拉取最新的项目代码
git pull

# 使用Docker Compose构建（重新构建改变的服务）并后台启动所有服务
docker-compose up -d --build

# 清理旧版本的Docker镜像
docker image prune -f

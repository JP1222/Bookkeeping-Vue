#!/bin/bash

# 从Git仓库拉取最新的项目代码
git pull

# 删除旧容器
docker compose down

# --build选项确保Docker Compose重新构建服务的镜像，会把旧镜像tag去掉
docker compose up -d --build

# 清理所有未使用的镜像，包括悬挂的和未被任何容器引用的镜像
docker image prune -af

# 启动新容器
docker compose up -d

# 使用 Node.js 18 镜像作为基础镜像
FROM node:18

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目文件
COPY . .

# 暴露端口
EXPOSE 4000
EXPOSE 4001
EXPOSE 4002
EXPOSE 10000
EXPOSE 10001
EXPOSE 10002

# 默认命令
CMD ["npm", "run", "dev"]
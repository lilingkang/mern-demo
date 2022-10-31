FROM mongo
WORKDIR /workspace
RUN apt update && apt-get install wget \
    && wget https://npm.taobao.org/mirrors/node/v16.14.2/node-v16.14.2-linux-x64.tar.gz \
    && tar -zxvf node-v16.14.2-linux-x64.tar.gz \
    && ln -s /workspace/node-v16.14.2-linux-x64/bin/node /usr/local/bin/ \
    && ln -s /workspace/node-v16.14.2-linux-x64/bin/npm /usr/local/bin/ \
    && ln -s /workspace/node-v16.14.2-linux-x64/bin/npx /usr/local/bin/ \
    && mkdir backend \
    && mkdir frontend
COPY package.json . 
COPY backend/package.json ./backend
COPY frontend/package.json ./frontend
RUN npm config set registry https://registry.npm.taobao.org \
    && npm install \
    && cd backend && npm install \
    && cd ../frontend && npm install \
    && cd ..
COPY . .
EXPOSE 3000
RUN chmod +x ./init.sh
CMD ./init.sh
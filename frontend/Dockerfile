FROM node:20-alpine

WORKDIR /usr/src/app

# キャッシュ利用で効率化するために別でコピー
COPY package.json package-lock.json ./

# ソースコードをコピー
COPY . .

# 依存関係をインストール
RUN npm install

# アプリケーションをビルド
RUN npm run build

# ポート番号を指定
EXPOSE 3000

# アプリケーションを起動
CMD ["npm","run","dev"]

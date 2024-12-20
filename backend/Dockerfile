# ベースイメージとしてGoを使用
FROM golang:1.23

# 作業ディレクトリを設定
WORKDIR /go/src

# Goモジュールファイルをコピー
COPY go.mod go.sum ./

# 依存関係をダウンロード
RUN go mod download

# アプリケーションのソースコードをコピー
COPY . .

# wait-for-itスクリプトをコピー
COPY wait-for-it.sh /wait-for-it.sh

# アプリケーションをビルド
RUN go build -o main .

# アプリケーションを実行
CMD ["/wait-for-it.sh", "db:3306", "--", "./main"]

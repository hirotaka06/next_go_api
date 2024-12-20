package infrastructure

import (
	"database/sql"
	"fmt"
	"os"

	"github.com/go-sql-driver/mysql"
	"github.com/joho/godotenv"
)

func DBConnect() (*sql.DB, error) {
	var err error

	// variables.envファイルを読み込む
	err = godotenv.Load()
	if err != nil {
		fmt.Println("Error open .env file")
		return nil, err
	}

	// 環境変数を変数に格納する
	dbUser := os.Getenv("MYSQL_USER")
	dbPass := os.Getenv("MYSQL_PASSWORD")
	dbAddr := "db:3306"
	dbName := os.Getenv("MYSQL_DATABASE")

	// 接続プロパティをキャプチャする
	cfg := mysql.Config{
		User:   dbUser,
		Passwd: dbPass,
		Net:    "tcp",
		Addr:   dbAddr,
		DBName: dbName,
	}

	// データベースを開く
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		fmt.Println("DB open Error")
		return nil, err
	}

	// 接続が有効であるか確認する
	pingErr := db.Ping()
	if pingErr != nil {
		fmt.Println("pingErr")
		return nil, pingErr
	}

	fmt.Println("接続成功")
	return db, nil
}

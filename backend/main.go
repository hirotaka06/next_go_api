package main

import (
	"log"

	"github.com/hirotaka06/project/backend/infrastructure"
	"github.com/hirotaka06/project/backend/infrastructure/repositories"
	"github.com/hirotaka06/project/backend/interfaces/handlers"
	"github.com/hirotaka06/project/backend/usecases"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// データベースに接続する
	db, err := infrastructure.DBConnect()
	if err != nil {
		log.Fatal(err)
	}
	defer db.Close()

	// リポジトリ、ユースケース、ハンドラを初期化する
	userRepo    := &repositories.UserRepository{DB: db}
	userUsecase := &usecases.UserUsecase{Repo: userRepo}
	userHandler := &handlers.UserHandler{Usecase: userUsecase}

	// Echoのインスタンスを作成
	e := echo.New()

	// CORSミドルウェアを追加
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000"}, // フロントエンドのURLを指定
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	// エンドポイントを設定
	e.GET("/users", userHandler.GetUsers)
	e.GET("/users/:id", userHandler.GetUser)
	e.POST("/users", userHandler.CreateUser)
	e.PUT("/users/:id", userHandler.UpdateUser)
	e.DELETE("/users/:id", userHandler.DeleteUser)

	// サーバーを開始
	e.Logger.Fatal(e.Start(":8080"))
}

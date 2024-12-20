package handlers

import (
	"net/http"
	"strconv"

	"github.com/hirotaka06/project/backend/entities"
	"github.com/hirotaka06/project/backend/usecases"

	"github.com/labstack/echo/v4"
)

type UserHandler struct {
	Usecase *usecases.UserUsecase
}

func (h *UserHandler) GetUsers(c echo.Context) error {
	users, err := h.Usecase.GetUsers()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, users)
}

func (h *UserHandler) GetUser(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid user ID")
	}

	user, err := h.Usecase.GetUser(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusOK, user)
}

func (h *UserHandler) CreateUser(c echo.Context) error {
	var user entities.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid request payload")
	}

	if err := h.Usecase.CreateUser(user); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.JSON(http.StatusCreated, user)
}

func (h *UserHandler) UpdateUser(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid user ID")
	}

	var user entities.User
	if err := c.Bind(&user); err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid request payload")
	}

	if err := h.Usecase.UpdateUser(id, user.Name); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusOK)
}

func (h *UserHandler) DeleteUser(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, "Invalid user ID")
	}

	if err := h.Usecase.DeleteUser(id); err != nil {
		return c.JSON(http.StatusInternalServerError, err.Error())
	}
	return c.NoContent(http.StatusNoContent)
}

package usecases

import "github.com/hirotaka06/project/backend/entities"

type UserRepository interface {
	GetAll() ([]entities.User, error)
	GetByID(id int) (entities.User, error)
	Create(user entities.User) error
	Update(id int, name string) error
	Delete(id int) error
}

type UserUsecase struct {
	Repo UserRepository
}

func (u *UserUsecase) GetUsers() ([]entities.User, error) {
	return u.Repo.GetAll()
}

func (u *UserUsecase) GetUser(id int) (entities.User, error) {
	return u.Repo.GetByID(id)
}

func (u *UserUsecase) CreateUser(user entities.User) error {
	return u.Repo.Create(user)
}

func (u *UserUsecase) UpdateUser(id int, name string) error {
	return u.Repo.Update(id, name)
}

func (u *UserUsecase) DeleteUser(id int) error {
	return u.Repo.Delete(id)
}

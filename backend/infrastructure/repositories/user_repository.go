package repositories

import (
	"database/sql"
	"fmt"

	"github.com/hirotaka06/project/backend/entities"
)

type UserRepository struct {
	DB *sql.DB
}

func (r *UserRepository) GetAll() ([]entities.User, error) {
	query     := "SELECT * FROM users"
	rows, err := r.DB.Query(query)
	if err != nil {
		return nil, fmt.Errorf("query error: %v", err)
	}
	defer rows.Close()

	var users []entities.User
	for rows.Next() {
		var user entities.User
		scanErr := rows.Scan(&user.ID, &user.Name, &user.Age)
		if scanErr != nil {
			return nil, fmt.Errorf("scan user error: %v", scanErr)
		}
		users = append(users, user)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("scan users error: %v", err)
	}
	return users, nil
}

func (r *UserRepository) GetByID(id int) (entities.User, error) {
	query := "SELECT * FROM users WHERE id = ?"
	row   := r.DB.QueryRow(query, id)

	var user entities.User
	err := row.Scan(&user.ID, &user.Name, &user.Age)
	if err != nil {
		return entities.User{}, fmt.Errorf("scan user error: %v", err)
	}

	return user, nil
}

func (r *UserRepository) Create(user entities.User) error {
	query  := "INSERT INTO users (name, age) VALUES (?, ?)"
	_, err := r.DB.Exec(query, user.Name, user.Age)
	if err != nil {
		return fmt.Errorf("insert user error: %v", err)
	}
	return nil
}

func (r *UserRepository) Update(id int, name string) error {
	query  := "UPDATE users SET name = ? WHERE id = ?"
	_, err := r.DB.Exec(query, name, id)
	if err != nil {
		return fmt.Errorf("update user error: %v", err)
	}
	return nil
}

func (r *UserRepository) Delete(id int) error {
	query  := "DELETE FROM users WHERE id = ?"
	_, err := r.DB.Exec(query, id)
	if err != nil {
		return fmt.Errorf("delete user error: %v", err)
	}
	return nil
}

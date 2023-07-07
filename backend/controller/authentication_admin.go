package controller

import (
	"net/http"

	"github.com/asaskevich/govalidator"
	"github.com/gin-gonic/gin"
	"github.com/tanapon395/sa-65-example/entity"
	"github.com/tanapon395/sa-65-example/service"
	"golang.org/x/crypto/bcrypt"
	
)

// LoginPayload login body
type LoginPayload_admin struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// SignUpPayload signup body
type SignUpPayload_admin struct {
	Name     string `json:"name" valid:"required~Name cannot be blank"`
	Email    string `json:"email" valid:"email"`
	Password string `json:"password" valid:"required~Password cannot be blank"`
	Role     string `json:"role" valid:"required~Role cannot be blank"`
}

// LoginResponse token response
type LoginResponse_admin struct {
	Role  string `json:"role"`
	Token string `json:"token"`
	ID    uint   `json:"id"`
}

// POST /login
func Login_admin(c *gin.Context) {
	var payload LoginPayload_admin
	// var user entity.User
	var admin entity.Admin

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	// ค้นหา user ด้วย email ที่ผู้ใช้กรอกเข้ามา
	// if err := entity.DB().Raw("SELECT * FROM users WHERE email = ?", payload.Email).Scan(&user).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if err := entity.DB().Raw("SELECT * FROM admins WHERE email = ?", payload.Email).Scan(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// // ตรวจสอบรหัสผ่าน
	// err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "password user is incerrect"})
	// 	return
	// }
	err := bcrypt.CompareHashAndPassword([]byte(admin.Password), []byte(payload.Password))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "password admin is incerrect"})
		return
	}

	// กำหนดค่า SecretKey, Issuer และระยะเวลาหมดอายุของ Token สามารถกำหนดเองได้
	// SecretKey ใช้สำหรับการ sign ข้อความเพื่อบอกว่าข้อความมาจากตัวเราแน่นอน
	// Issuer เป็น unique id ที่เอาไว้ระบุตัว client
	// ExpirationHours เป็นเวลาหมดอายุของ token

	jwtWrapper := service.JwtWrapper{
		SecretKey:       "SvNQpBN8y3qlVrsGAYYWoJJk56LtzFHx",
		Issuer:          "AuthService",
		ExpirationHours: 24,
	}

	// signedToken, err := jwtWrapper.GenerateToken(user.Email)
	// if err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "user error signing token"})
	// 	return
	// }

	signedToken, err := jwtWrapper.GenerateToken(admin.Email)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin error signing token"})
		return
	}

	// tokenResponse := LoginResponse{
	// 	Role:  user.Role,
	// 	Token: signedToken,
	// 	ID:    user.ID,
	// }

	tokenResponse := LoginResponse_admin{
		Role:  admin.Role,
		Token: signedToken,
		ID:    admin.ID,
	}

	// c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
	c.JSON(http.StatusOK, gin.H{"data": tokenResponse})
}

// POST /create
func CreateAdmin(c *gin.Context) {
	var payload SignUpPayload_admin
	// var user entity.User
	var admin entity.Admin

	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// แทรกการ validate ไว้ช่วงนี้ของ controller
	if _, err := govalidator.ValidateStruct(payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// เข้ารหัสลับรหัสผ่านที่ผู้ใช้กรอกก่อนบันทึกลงฐานข้อมูล
	hashPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), 14)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "error hashing password"})
		return
	}

	// user.Name = payload.Name
	// user.Email = payload.Email
	// user.Password = string(hashPassword)
	// user.Role = payload.Role

	admin.Name = payload.Name
	admin.Email = payload.Email
	admin.Password = string(hashPassword)
	admin.Role = payload.Role

	// if err := entity.DB().Create(&user).Error; err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if err := entity.DB().Create(&admin).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// c.JSON(http.StatusCreated, gin.H{"data": user})
	c.JSON(http.StatusCreated, gin.H{"data": admin})

}

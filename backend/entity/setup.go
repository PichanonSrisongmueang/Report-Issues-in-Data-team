package entity

import (
	// "os/user"
	//"time"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func DB() *gorm.DB {
	return db
}

func SetupDatabase() {
	database, err := gorm.Open(sqlite.Open("Issue.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}

	// Migrate the schema
	database.AutoMigrate(
		&Status{},
		&User{},
		&Project{},
		&Importance{},
		&Issue{},
		&Admin{},
	)

	db = database

	password, err := bcrypt.GenerateFromPassword([]byte("123456"), 14)

	// db.Model(&User{}).Create(&User{
	// 	Name:        "Data Analytics",
	// 	Email:       "pichanon@gmail.com",
	// 	Password:    string(password),
	// 	Role:        "employee",
	// 	PhoneNumber: "088-888-9999",
	// })
	db.Model(&User{}).Create(&User{
		Name:        "Data Analytics",
		Email:       "da@gmail.com",
		Password:    string(password),
		Role:        "employee",
		PhoneNumber: "062-444-5555",
		Department:  "Data Analytics",
	})
	db.Model(&Admin{}).Create(&Admin{
		Name:        "Data Engineer",
		Email:       "de@gmail.com",
		Password:    string(password),
		Role:        "user",
		PhoneNumber: "088-888-9999",
		Department:  "Data Engineer",
	})
	db.Model(&User{}).Create(&User{
		Name:        "Pichanon Srisong",
		Email:       "pichanon.sr@gmail.com",
		Password:    string(password),
		Role:        "employee",
		PhoneNumber: "093-936-9500",
		Department:  "Data Analytics",
	})
	db.Model(&Admin{}).Create(&Admin{
		Name:        "Korapat Thongrat",
		Email:       "korapat.th@gmail.com",
		Password:    string(password),
		Role:        "user",
		PhoneNumber: "088-844-1266",
		Department:  "Data Engineer",
	})
	db.Model(&User{}).Create(&User{
		Name:        "Warit Sapakorn",
		Email:       "Warit.sp@gmail.com",
		Password:    string(password),
		Role:        "employee",
		PhoneNumber: "085-645-2477",
		Department:  "Data Analytics",
	})
	db.Model(&Admin{}).Create(&Admin{
		Name:        "Kitti Sornsin",
		Email:       "kitti.so@gmail.com",
		Password:    string(password),
		Role:        "user",
		PhoneNumber: "081-554-2120",
		Department:  "Data Engineer",
	})

	var user User
	var admin Admin
	db.Raw("SELECT * FROM admins WHERE email = ?", "de@gmail.com").Scan(&admin)
	db.Raw("SELECT * FROM users WHERE email = ?", "da@gmail.com").Scan(&user)
	db.Raw("SELECT * FROM admins WHERE email = ?", "korapat.th@gmail.com").Scan(&admin)
	db.Raw("SELECT * FROM users WHERE email = ?", "Warit.sp@gmail.com").Scan(&user)
	db.Raw("SELECT * FROM users WHERE email = ?", "pichanon.sr@gmail.com").Scan(&user)
	db.Raw("SELECT * FROM users WHERE email = ?", "kitti.so@gmail.com").Scan(&user)

	// --- Video Data
	waitApprove := Status{
		Value: "รอเจ้าหน้าที่ตอบรับ",
	}
	db.Model(&Status{}).Create(&waitApprove)

	inProgress := Status{
		Value: "กำลังดำเนินการ",
	}
	db.Model(&Status{}).Create(&inProgress)

	complete := Status{
		Value: "สำเร็จ",
	}
	db.Model(&Status{}).Create(&complete)

	cancel := Status{
		Value: "ยกเลิก",
	}
	db.Model(&Status{}).Create(&cancel)

	// Resolution Data
	low := Importance{
		Value: "Low",
	}
	db.Model(&Importance{}).Create(&low)

	medium := Importance{
		Value: "Medium",
	}
	db.Model(&Importance{}).Create(&medium)

	high := Importance{
		Value: "High",
	}
	db.Model(&Importance{}).Create(&high)

	// PlayList Data
	LabSurveillanceDengue := Project{
		Title: "LabSurveillance - Dengue",
	}
	db.Model(&Project{}).Create(&LabSurveillanceDengue)

	LabSurveillanceTB := Project{
		Title: "LabSurveillance - Tuberculosis",
	}
	db.Model(&Project{}).Create(&LabSurveillanceTB)

	Covid19mon := Project{
		Title: "Covid19 - Monitoring",
	}
	db.Model(&Project{}).Create(&Covid19mon)

	// watch 1
	// db.Model(&Issue{}).Create(&Issue{
	// 	Project:    Revenue,
	// 	Status:     waitApprove,
	// 	IssueTimeCreate:  time.Now(),
	// 	Solution: "",
	// 	Detail: "จำนวน Rows ใน PowerBI น้อยเกินไป",
	// 	Importance: low,
	// 	// User: User{},
	// 	User: user,
	// 	Admin: admin,

	// })
	// // watch 2
	// db.Model(&Issue{}).Create(&Issue{
	// 	Project:    Sales,
	// 	Status:     waitApprove,
	// 	IssueTimeCreate:  time.Now(),
	// 	Solution: "",
	// 	Detail: "ข้อมูลไม่ตรงกัน",
	// 	Importance: high,
	// 	User: user,
	// })

	//
	// === Query
	//

}

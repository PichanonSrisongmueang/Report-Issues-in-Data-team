package entity

import (
	"time"

	"gorm.io/gorm"
)

type Issue struct {
	gorm.Model
	IssueTimeCreate  	time.Time
	IssueTimeUpdate  	time.Time
	IssueTimeComplete  	time.Time
	Solution   string
	Detail     string
	Note	   string
	QVpic      string
	PowerBIpic string
	// CreateBy   string
	// ApproveBy  string
	// ApproveBy  User `gorm:"references:id"`

	ImportanceID *uint
	Importance   Importance `gorm:"references:id"`

	ProjectID *uint
	Project   Project `gorm:"references:id"`

	StatusID *uint
	Status   Status `gorm:"references:id"`

	UserID *uint
	User   User `gorm:"references:id"`

	AdminID *uint
	Admin   Admin `gorm:"references:id"`
}

type Project struct {
	gorm.Model
	Title   string
	Description string
	OwnerID string
	Issues []Issue `gorm:"foreignKey:ProjectID"`
}

type Importance struct {
	gorm.Model
	Value  string
	Issues []Issue `gorm:"foreignKey:ImportanceID"`
}

type Status struct {
	gorm.Model
	Value  string
	Issues []Issue `gorm:"foreignKey:StatusID"`
}

type User struct {
	gorm.Model
	Name        string `valid:"required~Name cannot be blank"`
	Email       string `gorm:"uniqueIndex" valid:"email"`
	Password    string `json:"-"`
	Role        string `valid:"required~Role cannot be blank"`
	Department  string
	PhoneNumber string
	
	Issues []Issue `gorm:"foreignKey:UserID"`
}

type Admin struct {
	gorm.Model
	Name        string `valid:"required~Name cannot be blank"`
	Email       string `gorm:"uniqueIndex" valid:"email"`
	Password    string `json:"-"`
	Role        string `valid:"required~Role cannot be blank"`
	Department  string
	PhoneNumber string
	
	Issues []Issue `gorm:"foreignKey:AdminID"`
}
/*
type Video struct {
	gorm.Model
	Name string
	Url  string `gorm:"uniqueIndex"`
	// OwnerID ทำหน้าที่เป็น FK
	OwnerID *uint
	// เป็นข้อมูล user เมื่อ join ตาราง
	Owner       User         `gorm:"references:id"`
	WatchVideos []WatchVideo `gorm:"foreignKey:VideoID"`
}

type Playlist struct {
	gorm.Model
	Title string
	// OwnerID ทำหน้าที่เป็น FK
	OwnerID *uint
	// เป็นข้อมูล user เมื่อ join ตาราง
	Owner       User         `gorm:"references:id"`
	WatchVideos []WatchVideo `gorm:"foreignKey:PlaylistID"`
}

type Resolution struct {
	gorm.Model
	Value       string
	WatchVideos []WatchVideo `gorm:"foreignKey:ResolutionID"`
}

type WatchVideo struct {
	gorm.Model
	WatchedTime time.Time

	// ResolutionID ทำหน้าที่เป็น FK
	ResolutionID *uint
	Resolution   Resolution `gorm:"references:id"`

	// PlaylistID ทำหน้าที่เป็น FK
	PlaylistID *uint
	Playlist   Playlist `gorm:"references:id"`

	// VideoID ทำหน้าที่เป็น FK
	VideoID *uint
	Video   Video `gorm:"references:id"`
}*/

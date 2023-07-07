package controller

import (
	// "fmt"
	"net/http"
	//"time"
	"github.com/gin-gonic/gin"
	"github.com/tanapon395/sa-65-example/entity"
)

// POST /watch_videos
func CreateIssue(c *gin.Context) {

	var issue entity.Issue
	var importance entity.Importance
	var project entity.Project
	var user entity.User
	// var admin entity.Admin
	var status entity.Status

	// ผลลัพธ์ที่ได้จากขั้นตอนที่ 8 จะถูก bind เข้าตัวแปร watchVideo
	if err := c.ShouldBindJSON(&issue); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// 9: ค้นหา video ด้วย id
	if tx := entity.DB().Where("id = ?", issue.StatusID).First(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Status not found"})
		return
	}

	// 10: ค้นหา resolution ด้วย id
	if tx := entity.DB().Where("id = ?", issue.ImportanceID).First(&importance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "importance not found"})
		return
	}

	// 11: ค้นหา playlist ด้วย id
	if tx := entity.DB().Where("id = ?", issue.ProjectID).First(&project); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Project not found"})
		return
	}
	// 10: ค้นหา resolution ด้วย id
	if tx := entity.DB().Where("id = ?", issue.UserID).First(&user); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "user not found"})
		return
	}

	// if tx := entity.DB().Where("id = ?", issue.AdminID).First(&admin); tx.RowsAffected == 0 {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
	// 	return
	// }

	// December 31, 1999
	// 12: สร้าง WatchVideo
	wv := entity.Issue{
		Importance: importance, // โยงความสัมพันธ์กับ Entity Resolution
		Status:     status,
		User:       user,                    // โยงความสัมพันธ์กับ Entity Video
		// Admin: 		admin,
		Project:    project,                 // โยงความสัมพันธ์กับ Entity Playlist
		IssueTimeCreate:  issue.IssueTimeCreate.Local(), // ตั้งค่าฟิลด์ watchedTime
		IssueTimeUpdate: issue.IssueTimeUpdate.Local(),
		IssueTimeComplete: issue.IssueTimeComplete.Local(),
		Detail:     issue.Detail,
		Solution:   issue.Solution,
		Note: 		issue.Note,
		QVpic:      issue.QVpic,
		PowerBIpic: issue.PowerBIpic,
		// CreateBy:   issue.CreateBy,
		// ApproveBy:  issue.ApproveBy,
	}

	// 13: บันทึก
	if err := entity.DB().Create(&wv).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, gin.H{"data": wv})
}

// GET /watchvideo/:id
// func GetIssue(c *gin.Context) {
// 	var issue entity.Issue
// 	id := c.Param("id")
// 	if tx := entity.DB().Where("id = ?", id).First(&issue); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "issue not found"})
// 		return
// 	}
// 	c.JSON(http.StatusOK, gin.H{"data": issue})
// }

func GetIssue(c *gin.Context) {
	var issue entity.Issue
	id := c.Param("id")
	if err := entity.DB().Preload("Status").Preload("Project").Preload("Importance").Preload("User").Preload("Admin").Raw("SELECT * FROM issues WHERE id = ?", id).Find(&issue).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": issue})
}

// GET /watch_videos
func ListIssues(c *gin.Context) {
	var issues []entity.Issue
	if err := entity.DB().Preload("Status").Preload("Project").Preload("Importance").Preload("User").Preload("Admin").Raw("SELECT * FROM issues").Find(&issues).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": issues})
}

// DELETE /watch_videos/:id
func DeleteIssue(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM issues WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "issue not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}

// PATCH /watch_videos
// func UpdateIssue(c *gin.Context) {
// 	var issue entity.Issue
// 	if err := c.ShouldBindJSON(&issue); err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	if tx := entity.DB().Where("id = ?", issue.ID).First(&issue); tx.RowsAffected == 0 {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": "issue not found"})
// 		return
// 	}

// 	if err := entity.DB().Save(&issue).Error; err != nil {
// 		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
// 		return
// 	}

// 	c.JSON(http.StatusOK, gin.H{"data": issue})
// }

func UpdateIssue(c *gin.Context) {

	var issue entity.Issue
	var payload entity.Issue

	var status entity.Status
	var importance entity.Importance
	// var user entity.User
	var admin entity.Admin
	var project entity.Project

	// Bind Json to var emp
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.ID).Find(&issue); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "issue not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.StatusID).Find(&status); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "status not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.ImportanceID).Find(&importance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "importance not found"})
		return
	}


	if tx := entity.DB().Where("id = ?", payload.AdminID).Find(&admin); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "admin not found"})
		return
	}

	if tx := entity.DB().Where("id = ?", payload.ProjectID).Find(&project); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "project not found"})
		return
	}

	IssueUpdate := entity.Issue{
		Importance: importance, // โยงความสัมพันธ์กับ Entity Resolution
		Status:     status,
		// User:       user,                    // โยงความสัมพันธ์กับ Entity Video
		Admin: 		admin,
		Project:    project,                 // โยงความสัมพันธ์กับ Entity Playlist
		IssueTimeCreate:  payload.IssueTimeCreate.Local(), // ตั้งค่าฟิลด์ watchedTime
		IssueTimeUpdate: payload.IssueTimeUpdate.Local(),
		IssueTimeComplete: payload.IssueTimeComplete.Local(),
		Detail:     payload.Detail,
		Solution:   payload.Solution,
		Note: 		payload.Note,
		QVpic:      payload.QVpic,
		PowerBIpic: payload.PowerBIpic,
		// CreateBy:   issue.CreateBy,
		// ApproveBy:  issue.ApproveBy,
	}

	// if _, err := govalidator.ValidateStruct(IssueUpdate); err != nil {
	// 	c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
	// 	return
	// }

	if err := entity.DB().Where("id = ?", issue.ID).Updates(&IssueUpdate).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"status": "Updating success!!",
		"data":   IssueUpdate,
	})

}

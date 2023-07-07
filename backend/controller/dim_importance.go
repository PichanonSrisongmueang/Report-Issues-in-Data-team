package controller

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/tanapon395/sa-65-example/entity"
)

// POST /resolutions
// GET /resolution/:id
func GetImportance(c *gin.Context) {
	var importance entity.Importance
	id := c.Param("id")
	if tx := entity.DB().Where("id = ?", id).First(&importance); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "importance not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": importance})
}

// GET /resolutions
func ListImportance(c *gin.Context) {
	var importance []entity.Importance
	if err := entity.DB().Raw("SELECT * FROM importances").Scan(&importance).Error; err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": importance})
}

// DELETE /resolutions/:id
func DeleteImportance(c *gin.Context) {
	id := c.Param("id")
	if tx := entity.DB().Exec("DELETE FROM importances WHERE id = ?", id); tx.RowsAffected == 0 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "importance not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"data": id})
}


package main

import (
	"github.com/gin-gonic/gin"
	"github.com/tanapon395/sa-65-example/controller"
	"github.com/tanapon395/sa-65-example/entity"
	"github.com/tanapon395/sa-65-example/middlewares"
)

const PORT = "8080"

func main() {
	entity.SetupDatabase()

	r := gin.Default()
	r.Use(CORSMiddleware())

	router := r.Group("/")
	
	{
		router.Use(middlewares.Authorizes())
		{
			// User Routes
			router.GET("/users", controller.ListUsers)
			router.GET("/user/:id", controller.GetUser)
			router.PATCH("/users", controller.UpdateUser)
			router.DELETE("/users/:id", controller.DeleteUser)

			// Admin Routes
			router.GET("/admins", controller.ListAdmins)
			router.GET("/admin/:id", controller.GetAdmin)
			router.PATCH("/admins", controller.UpdateAdmin)
			router.DELETE("/admins/:id", controller.DeleteAdmin)

			// Video Routes
			router.GET("/importances", controller.ListImportance)
			router.GET("/importances/:owner_id", controller.ListImportance)
			router.GET("/importance/:id", controller.GetImportance)
			//router.POST("/importances", controller.CreateImportance)
			//router.PATCH("/importances", controller.UpdateImportance)
			router.DELETE("/importances/:id", controller.DeleteImportance)

			// Playlist Routes
			router.GET("/projects", controller.ListProjects)
			router.GET("/project/:id", controller.GetProject)
			//router.GET("/project/watched/user/:owner_id", controller.GetPlaylistWatchedByUser)
			router.POST("/projects", controller.CreateProject)
			router.PATCH("/projects", controller.UpdateProject)
			router.DELETE("/projects/:id", controller.DeleteProject)

			// Resolution Routes = status
			router.GET("/status", controller.ListStatus)
			router.GET("/status/:id", controller.GetStatus)
			router.POST("/status", controller.CreateStatus)
			router.PATCH("/status", controller.UpdateStatus)
			router.DELETE("/status/:id", controller.DeleteStatus)

			// WatchVideo Routes
			router.GET("/issues", controller.ListIssues)
			router.GET("/issue/:id", controller.GetIssue)
			router.POST("/issues", controller.CreateIssue)
			router.PATCH("/issues", controller.UpdateIssue)
			router.DELETE("/issues/:id", controller.DeleteIssue)

		}
	}

	// Signup User Route
	r.POST("/signup", controller.CreateUser)
	// login User Route
	r.POST("/login", controller.Login)
	r.POST("/loginadmin", controller.Login_admin)

	// Run the server go run main.go
	r.Run("localhost: " + PORT)
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, PATCH")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

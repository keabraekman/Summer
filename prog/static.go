package main

import (
	"net/http"

	"github.com/keabraekman/Summer/prog/externalui"
	"github.com/keabraekman/Summer/prog/staticui"
)

// GetFS obtains the UI code
func GetFS(useExternal bool) http.FileSystem {
	if useExternal {
		return externalui.FS(false)
	}
	return staticui.FS(false)
}

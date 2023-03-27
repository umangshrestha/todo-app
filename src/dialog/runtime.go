package dialog

import (
	"context"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

func BeforeClose(ctx context.Context) bool {
	dialogBox, err := runtime.MessageDialog(ctx, runtime.MessageDialogOptions{
		Type:          runtime.QuestionDialog,
		Title:         "Quit?",
		Message:       "Do you want to Quit?",
		DefaultButton: "No",
	})

	return (err == nil) && (dialogBox != "Yes")
}

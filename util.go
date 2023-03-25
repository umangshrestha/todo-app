package main

import (
	"encoding/json"

	"github.com/sirupsen/logrus"
)

type Input struct {
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
	Deleted   bool   `json:"deleted"`
}

func MapToInput[T Input | Query](m *map[string]any, log *logrus.Logger) *T {
	var input *T
	data, err := json.Marshal(m)
	if err != nil {
		log.Fatalln("MapToInput Marshall:", err)
	}
	if err := json.Unmarshal(data, input); err != nil {
		log.Fatalln("MapToInput UnMarshall:", err)
	}
	return input
}

type Query struct {
	Limit     int  `json:"limit"`
	Offset    int  `json:"offset"`
	Deleted   bool `json:"deleted"`
	Completed bool `json:"completed"`
}

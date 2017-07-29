package utils

import (
	"io/ioutil"
	"encoding/json"
	"io"
)

func fromJson(bytes *io.Reader, obj interface{}) interface{} {
	jsonDataFromHttp, err := ioutil.ReadAll(bytes)

	if nil != err {
		panic("Error read input bytes: " + err.Error())
	}

	unmarshalErr := json.Unmarshal([]byte(jsonDataFromHttp), &obj)

	if nil != unmarshalErr {
		panic("Error while parsing json: " + unmarshalErr.Error())
	}

	return obj
}

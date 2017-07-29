package controller

import (
	"net/http"
	"io/ioutil"
	"encoding/json"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"strings"
	"crypto/hmac"
	"net/url"
	"log"
)

func GetRequest(url string, obj interface{}) interface{}  {
	resp, err := http.Get(url)

	if nil != err {
		panic("Error get request: " + err.Error())
	}

	jsonDataFromHttp, err := ioutil.ReadAll(resp.Body)
	unmarshalErr := json.Unmarshal([]byte(jsonDataFromHttp), &obj)

	if nil != unmarshalErr {
		panic("Error while parsing json: " + unmarshalErr.Error())
	}

	return obj
}

func GetRequestWithAccessR(urlRequest string, obj interface{}) interface{}  {
	baseUrl, err := url.Parse(urlRequest)

	if nil!= err {
		panic(err)
	}

	baseUrl.Query().Add("currencyPair", "BTC/USD")

	sig := hmac.New(sha256.New, []byte("#############"))

	p, err := json.Marshal(baseUrl)
	if err != nil {
		panic(err)
	}

	sig.Write([]byte(base64.StdEncoding.EncodeToString(p)))
	signHeader := hex.EncodeToString(sig.Sum(nil))

	request, err := http.NewRequest("GET", baseUrl.String(), nil)
	if err != nil {
		panic(err)
	}

	request.Header.Add("Content-Type", "application/x-www-form-urlencoded")
	request.Header.Add("Api-Key", "########")
	request.Header.Add("Sign", strings.ToUpper(signHeader))

	resp, err := http.DefaultClient.Do(request)
	if nil != err {
		panic("Error get request: " + err.Error())
	}

	log.Println("Response: {}", resp.Status)

	jsonDataFromHttp, err := ioutil.ReadAll(resp.Body)
	log.Println("Response: {}", string(jsonDataFromHttp))

	unmarshalErr := json.Unmarshal([]byte(jsonDataFromHttp), &obj)

	if nil != unmarshalErr {
		panic("Error while parsing json: " + unmarshalErr.Error())
	}

	return obj
}

func signPayload(payload string, apiSecret string) string {
	sig := hmac.New(sha256.New, []byte(apiSecret))

	json, err := json.Marshal(payload)
	if err != nil {
		panic(err)
	}

	encoded := base64.StdEncoding.EncodeToString(json)
	sig.Write([]byte(encoded))

	return strings.ToUpper(hex.EncodeToString(sig.Sum(nil)))
}

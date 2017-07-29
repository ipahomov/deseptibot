package main

import (
	"github.com/gorilla/mux"
	"log"
	"net/http"
	"fmt"
	"deseptibot/controller"
	"encoding/json"
	"net/url"
)

// Request example: http://localhost:8080/api/currents?fsyms=BTC,ETH,XMR&tsyms=USD&e=LiveCoin
func main() {
	fmt.Println("APP STARTED")
	handleRequests()
}

func handleRequests() {
	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/", homePage).Methods("GET")
	router.HandleFunc("/api/currents", getCurrencyWithVariables).
		Methods("GET").
		Queries("fsyms", "{fsyms}", "tsyms", "{tsyms}", "e", "{e}")
	log.Fatal(http.ListenAndServe(":8080", router))
}

func homePage(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Welcome to the HomePage!")
}

func getCurrencyWithVariables(w http.ResponseWriter, r *http.Request) {
	//const GET_CURRENCY_PAIR = "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC,ETH,XMR&tsyms=USD&e=LiveCoin"
	const GET_CURRENCY_PAIR = "https://min-api.cryptocompare.com/data/pricemultifull"
	var currency Currency

	values := r.URL.Query()
	fmt.Println("VARS: ", values)

	baseUrl, error := url.Parse(GET_CURRENCY_PAIR)

	if nil != error {
		panic(error)
	}

	query := baseUrl.Query()
	query.Add("fsyms", values.Get("fsyms"))
	query.Add("tsyms", values.Get("tsyms"))
	query.Add("e", values.Get("e"))

	baseUrl.RawQuery = query.Encode()

	fmt.Println("RequestURL: ", baseUrl.String())

	cp := controller.GetRequest(baseUrl.String(), currency)

	json.NewEncoder(w).Encode(cp)
	fmt.Println("RESPONSE: ", cp)
}

type Currency struct {
	Raw *Raw `json:"RAW"`
}

type Raw struct {
	BTC BTC `json:"BTC"`
}

type BTC struct {
	USD USD `json:"USD"`
}

type USD struct {
	Market string `json:"MARKET"`
	Price  float64 `json:"PRICE"`
}

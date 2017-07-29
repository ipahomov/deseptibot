package main

import (
	"fmt"

	"deseptibot/model/exchange/livecoin"
	"deseptibot/controller"
)


const GET_CURRENCY_PAIR = "https://api.livecoin.net/exchange/ticker?currencyPair=BTC/USD"
const API_KEY = "#############"
const SIGN = "############################";
var currencyPair livecoin.CurrencyPair
var commission livecoin.Commission


func main() {
	cp := controller.GetRequest(GET_CURRENCY_PAIR, currencyPair)
	fmt.Println(cp)

	c := controller.GetRequestWithAccessR("https://api.livecoin.net/exchange/client_orders?currencyPair=BTC/USD", commission)
	fmt.Println(c)

}



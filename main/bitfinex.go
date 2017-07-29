package main

import (
	"fmt"
	"github.com/bitfinexcom/bitfinex-api-go/v1"
)

func main()  {
	resp, err := bitfinex.NewClient().Ticker.Get("*")

	if nil != err {
		panic(err)
	}

	fmt.Println(resp)

	client := bitfinex.NewClient().Auth("##########", "######")

	//info, err := client.Account.Info()
	info, err := client.Balances.All()

	if err != nil {
		fmt.Println(err)
	} else {
		fmt.Println(info)
	}
}

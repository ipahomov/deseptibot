package model

type CurrencyPair struct {

	LastPrice float64 `json:"last_price"`
	Low       float64 `json:"low"`
	High      float64 `json:"high"`
	Volume    float64 `json:"volume"`
	Mid       float64 `json:"mid"`
	Bid       float64 `json:"bid"`
	Ask       float64 `json:"ask"`
	Timestamp float64 `json:"timestamp"`
}

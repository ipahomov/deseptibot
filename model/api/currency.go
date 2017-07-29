package api

type Currency struct {
	Symbol string `json: symbol`
	Last   float64 `json:"last"`
	High   float64 `json:"high"`
	Low    float64 `json:"low"`
	Volume float64 `json:"volume"`
	Mid    float64 `json:"mid"`
	Bid    float64 `json:"bid"`
	Ask    float64 `json:"ask"`
}

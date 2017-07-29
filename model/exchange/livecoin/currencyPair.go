package livecoin

type CurrencyPair struct {
	//Symbol  string `json: symbol`
	Last    float64 `json:"last"`
	High    float64 `json:"high"`
	Low     float64 `json:"low"`
	Volume  float64 `json:"volume"`
	Vwap    float64 `json:"vwap"`
	MaxBid  float64 `json:"max_bid"`
	MinAsk  float64 `json:"min_ask"`
	BestBid float64 `json:"best_bid"`
	BestAsk float64 `json:"best_ask"`
}

package livecoin

type Commission struct {
	Success bool `json:success`
	Fee     float64 `json:fee`
}

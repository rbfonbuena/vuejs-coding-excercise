const app = new Vue({
  el: '#app',
  data: {
    fromCurrency: 'PHP',
    toCurrency: 'AUD',
    fromRate: 1,
    toRate: 0,
    currencies: ['AUD', 'BGN', 'BRL', 'CAD', 'CHF', 'CNY', 'CZK', 'DKK', 'GBP', 'HKD', 'HRK', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PLN', 'RON', 'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'USD', 'ZAR'],
    rates: null,
    results: [],
    errors: []
  },
  watch: {
    fromCurrency: 'getFxRates',
    toCurrency: 'getQuoteRate',
    fromRate: 'getQuoteRate',
  },
  methods: {
    getFxRates: function() {
      axios.get('http://api.fixer.io/latest?base='+this.fromCurrency)
      .then(response => {
        this.results = response.data;
        if ( this.fromCurrency === this.toCurrency ) {
          this.toRate = this.fromRate * 1;
        } else {
          this.toRate = this.fromRate * this.results.rates[this.toCurrency];
        }
      })
      .catch(e => {
        this.errors.push(e);
      })
    },
    getQuoteRate: function() {
      if ( this.fromCurrency === this.toCurrency ) return this.toRate = this.fromRate * 1;
      return this.toRate = this.fromRate * this.results.rates[this.toCurrency];
    },
  },
  computed: {
  },
  mounted: function() {
    this.$nextTick(function() {
      this.getFxRates();
    })
  }
})

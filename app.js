const app = new Vue({
  el: '#app',
  data: {
    fromCurrency: 'PHP',
    toCurrency: 'AUD',
    fromRate: 1,
    toRate: 0,
    currencies: null,
    results: [],
    errors: []
  },
  watch: {
    fromCurrency: 'getFxRates',
    toCurrency: 'getQuoteRate',
    fromRate: 'getQuoteRate',
  },
  methods: {
    handleCurrencyChange: (e) => {
      let selectedCurrency = e.target.options;
      let index = e.target.selectedIndex;
      return this.fromCurrency = selectedCurrency[index].value;
    },
    getCurrencies: function() {
      axios.get('data/currency.json')
      .then(response => {
        this.currencies = response.data;
      })
    },
    getFxRates: function() {
      axios.get('https://api.fixer.io/latest?base='+this.fromCurrency)
      .then(response => {
        this.results = response.data;
        if ( this.fromCurrency === this.toCurrency ) {
          let newRate = this.fromRate * 1;
          this.toRate = newRate.toFixed(3);
        } else {
          let newRate = this.fromRate * this.results.rates[this.toCurrency];
          this.toRate = newRate.toFixed(3);
        }
      })
      .catch(e => {
        this.errors.push(e);
      })
    },
    getQuoteRate: function() {
      if ( isNaN(this.fromRate) ) {
        return this.fromRate = 1;
      }
      if ( this.fromCurrency === this.toCurrency ) {
        let newRate = this.fromRate * 1;
        return this.toRate = newRate.toFixed(3);
      } else {
        let newRate = this.fromRate * this.results.rates[this.toCurrency];
        return this.toRate = newRate.toFixed(3);
      }
    },
  },
  computed: {},
  mounted: function() {
    this.$nextTick(function() {
      this.getFxRates();
      this.getCurrencies();
    })
  }
})

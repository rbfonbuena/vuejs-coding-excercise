const app = new Vue({
  el: '#app',
  data: {
    openExchangeApi: '//openexchangerates.org/api/latest.json?app_id=1961e80e4b5f4b2488b7729e080dd010',
    apiUrl: '//free.currencyconverterapi.com/api/v5/convert?compact=ultra&q=',
    fromCurrency: 'AUD',
    toCurrency: 'PHP',
    fromRate: 1,
    toRate: 0,
    currencySet: null,
    currencies: null,
    errors: []
  },
  watch: {
    fromCurrency: 'getQuotedRate',
    toCurrency: 'getQuotedRate',
    fromRate: 'getQuotedRate',
  },
  methods: {
    // Handles the currency symbol selection
    handleCurrencyChange: (e) => {
      let selectedCurrency = e.target.options;
      let index = e.target.selectedIndex;
      this.fromCurrency = selectedCurrency[index].value;
      this.toCurrency = selectedCurrency[index].value;
    },

    // Load available/allowed currencies
    getCurrencies: function() {
      axios.get('data/currency.json')
      .then(response => {
        this.currencies = response.data;
      })
    },

    // Compute rates
    getQuotedRate: function() {
      let currencySet = this.fromCurrency + '_' + this.toCurrency;
      console.log(currencySet);
      axios.get(this.apiUrl + currencySet)
        .then(response => {
          let quotedRate = response.data;
          this.toRate = quotedRate[currencySet];
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
  },
  computed: {},
  mounted: function() {
    this.$nextTick(function() {
      this.getCurrencies();
      this.getQuotedRate();
    })
  }
})

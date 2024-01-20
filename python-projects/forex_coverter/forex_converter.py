"""Utilities related to the forex converter app"""
from forex_python.converter import CurrencyRates, CurrencyCodes, RatesNotAvailableError

class ForexConverter():

    """Forex Converter Class 

        To  make a Forex Converter Object, pass in a currency code you want to convert from, 
        a currency code you want to convert to and the amount you are trying to convert. Below
        you can see different situations and the expected results:
        For a case where all inputs are correctly inputed, you should expect the following return:
            >>> fx = ForexConverter("USD", "AUD", 10)
            >>> fx.conversion_check()
            'The result is $12.97'

        For a case where all both currency codes are lower case, you should expect the following return:
            >>> fx_b = ForexConverter("usd", "aud", 10)
            >>> fx_b.conversion_check()
            'The result is $12.97'

        For a case where the currency code we are converting from is invalid, you should expect the following return:
            >>> fx_c = ForexConverter("buc", "AUD", 10)
            >>> fx_c.conversion_check()
            'Not a valid code: BUC'

        For a case where the currency code we are converting to is invalid, you should expect the following return:
            >>> fx_d = ForexConverter("USD", "BUC", 10)
            >>> fx_d.conversion_check()
            'Not a valid code: BUC'

        For a case where both currency codes inputed are invalid, you should expect the following return:
            >>> fx_e = ForexConverter("buc", "SHE", 10)
            >>> fx_e.conversion_check()
            'Both BUC and SHE are invalid codes!'

        For a case where the currency code we are converting from is invalid, you should expect the following return:
            >>> fx_f = ForexConverter("USD", "AUD", "Olu")
            >>> fx_f.conversion_check()
            'Not a valid amount'

        """

    def __init__(self, convert_from, convert_to, amount):
        """This method Converts from one currency to another given the amount"""
        self.convert_from = convert_from.upper()
        self.convert_to = convert_to.upper()
        self.amount = amount 
        self.supported_currency_codes = ["EUR", "IDR", "BGN", "ILS", "GBP", "DKK", "CAD", "JPY", "HUF", "RON", "MYR", "SEK", "SGD", 
                                        "HKD", "AUD", "CHF", "KRW", "CNY", "TRY", "HRK", "NZD", "THB", "USD", "NOK", "RUB", "INR",
                                        "MXN", "CZK", "BRL", "PLN", "PHP", "ZAR"]
        self.c = CurrencyRates()
        self.cc = CurrencyCodes()
    
    def __repr__(self):
        """This method shows a representation of the ForexConverter Class"""
        return f"<ForexConverter convert_from = {self.convert_from}, convert_to = {self.convert_to}, amount = {self.amount}>"

    def conversion_check(self):
       """This method checks to see the correct inputs are entered and handles the error if any exist"""
       if self.convert_to not in self.supported_currency_codes and self.convert_from not in self.supported_currency_codes:
            return f"Both {self.convert_from} and {self.convert_to} are invalid codes!" 
      
       if self.convert_from not in self.supported_currency_codes:
           return f"Not a valid code: {self.convert_from}"

       elif self.convert_to not in self.supported_currency_codes:
           return f"Not a valid code: {self.convert_to}"

       elif isinstance(self.amount, int) is False and isinstance(self.amount, float) is False :
           return "Not a valid amount"
        
       else:
           return self.convert_currency() 
                

    def convert_currency(self):
        """This method converts one currency to another"""
        new_amt_dec = self.c.convert(self.convert_from, self.convert_to, self.amount)
        new_amt = "{:.2f}".format(new_amt_dec)
        to_symbol = self.cc.get_symbol(self.convert_to)
        
        return f"The result is {to_symbol}{new_amt}"
       

      
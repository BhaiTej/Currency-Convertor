const fromAmountElement=document.querySelector('.amount')
const covertedtAmountElement=document.querySelector('.convertedAmount')
const fromCurrencyElement=document.querySelector('.fromCurrency')
const toCurrencyElement=document.querySelector('.toCurrency')
const resultElement=document.querySelector('.result')
const convertorContainer=document.querySelector('.convertor-container')
// Array to populate the select tags the these countries
const countries=[
    { code: "USD", name: "United States Dollar" },
  { code: "INR", name: "Indian Rupee" },
  { code: "EUR", name: "Euro" },
  { code: "GBP", name: "British Pound Sterling" },
  { code: "AUD", name: "Australian Dollar" },
  { code: "CAD", name: "Canadian Dollar" },
  { code: "JPY", name: "Japanese Yen" },
  { code: "CNY", name: "Chinese Yuan" },
  { code: "CHF", name: "Swiss Franc" },
  { code: "NZD", name: "New Zealand Dollar" },
  { code: "SGD", name: "Singapore Dollar" },
  { code: "HKD", name: "Hong Kong Dollar" },
  { code: "KRW", name: "South Korean Won" },
  { code: "SEK", name: "Swedish Krona" },
  { code: "NOK", name: "Norwegian Krone" },
  { code: "DKK", name: "Danish Krone" },
  { code: "RUB", name: "Russian Ruble" },
  { code: "BRL", name: "Brazilian Real" },
  { code: "ZAR", name: "South African Rand" },
  { code: "MXN", name: "Mexican Peso" },
  { code: "IDR", name: "Indonesian Rupiah" },
  { code: "TRY", name: "Turkish Lira" },
  { code: "SAR", name: "Saudi Riyal" },
  { code: "AED", name: "United Arab Emirates Dirham" },
  { code: "THB", name: "Thai Baht" },
  { code: "MYR", name: "Malaysian Ringgit" },
  { code: "PHP", name: "Philippine Peso" },
  { code: "PLN", name: "Polish Zloty" },
  { code: "HUF", name: "Hungarian Forint" },
  { code: "CZK", name: "Czech Koruna" },
  { code: "ILS", name: "Israeli New Shekel" },
  { code: "EGP", name: "Egyptian Pound" },
  { code: "NGN", name: "Nigerian Naira" },
  { code: "PKR", name: "Pakistani Rupee" },
  { code: "BDT", name: "Bangladeshi Taka" },
  { code: "LKR", name: "Sri Lankan Rupee" },
  { code: "VND", name: "Vietnamese Dong" },
  { code: "ARS", name: "Argentine Peso" },
  { code: "CLP", name: "Chilean Peso" },
  { code: "COP", name: "Colombian Peso" },
  { code: "PEN", name: "Peruvian Sol" },
  { code: "KZT", name: "Kazakhstani Tenge" },
  { code: "UAH", name: "Ukrainian Hryvnia" },
  { code: "QAR", name: "Qatari Riyal" },
  { code: "KWD", name: "Kuwaiti Dinar" },
  { code: "BHD", name: "Bahraini Dinar" },
  { code: "OMR", name: "Omani Rial" },
  { code: "MAD", name: "Moroccan Dirham" },
  { code: "TWD", name: "New Taiwan Dollar" },
  { code: "RON", name: "Romanian Leu" },
  { code: "BGN", name: "Bulgarian Lev" }

]; 
countries.forEach(country =>{
    const option1=document.createElement('option');
    const option2=document.createElement('option');
    option1.value=option2.value=country.code;
    option1.textContent=option2.textContent=`${country.code}(${country.name})`
    fromCurrencyElement.appendChild(option1);
    toCurrencyElement.appendChild(option2); 
    // setting default value
    fromCurrencyElement.value="USD";
    toCurrencyElement.value="INR"
})

const getExchangeRate = async ()=>{
    const amount=parseFloat(fromAmountElement.value)
    const fromCurrency=fromCurrencyElement.value;
    const toCurrency=toCurrencyElement.value;
    resultElement.textContent="Fetching Exchange Rates.."
    //  fetch data from URL
    try {
        const response=await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data=await response.json();
        const conversionRate=data.rates[toCurrency];
        const covertedtAmount=(amount*conversionRate).toFixed(2);
        
        if(typeof conversionRate=='undefined'){
            resultElement.textContent="Exchange rate data is not available for selected counries"
            covertedtAmountElement=''
        }
        else{
            covertedtAmountElement.value=covertedtAmount
            resultElement.textContent=`${amount}${fromCurrency} = ${covertedtAmount}${toCurrency}`
        }
        
    } catch (error) {
        convertorContainer.innerHTML=`<h1>Error while fetching exchange rates!!!</h1>`;
    }
   
}
// Fetching exchange rateehen user inputs the amount
fromAmountElement.addEventListener('input',getExchangeRate)
// Fetching exchange rateehen user inputs the amount

fromCurrencyElement.addEventListener('change',getExchangeRate)
toCurrencyElement.addEventListener('change',getExchangeRate)
window.addEventListener('load',getExchangeRate)
// getExchangeRate()
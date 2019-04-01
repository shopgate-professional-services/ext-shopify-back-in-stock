# Shopgate Connect - Extension shopify-back-in-stock

This extension integrates a Shopgate app with the [Back in Stock Shopify App](https://apps.shopify.com/back-in-stock). When a product is out of stock a form will be shown that allows a shopper to sign up to get an email when the item is back in stock.

## Configuration
It is necessary to configure the Back In Stock api URL and the name of the Shopify shop for the extension to function. 
The coloring and text of form elements can be modified using configurations as well.
Configure the url of the Back in Stock api in the configuration called backInStockAPIUrl.
```json
{
  "backInStockAPIUrl": "https://app.backinstock.org/stock_notification/create.json"
}
```
Add the Shopify Shop name to the backInStockShopName configuration
```json
{
  "backInStockShopName": "merlins-magnificent-magic-shop.myshopify.com"
}
```

Add a custom color to the notification form buttons with backInStockButtonColor
```json
 {
   "backInStockButtonColor": "#000"
 }
```
Add a custom text color to the notification form buttons with backInStockButtonTextColor
```json
 {
   "backInStockButtonTextColor": "#FFF"
 }
```

Add custom text to the button that expands the notification form with backInStockOpenFormButtonText
```json
 {
   "backInStockOpenFormButtonText": "Email Me When Back in Stock"
 }
```

Add custom text to the submit button of the notification form with backInStockFormSubmitButtonText
```json
 {
   "backInStockFormSubmitButtonText": "Send Request"
 }
```

Add custom text to the header confirming notification with backInStockSubmissionConfirmationText
```json
 {
   "backInStockSubmissionConfirmationText": "Notification Request Sent"
 }
```

## About Shopgate

Shopgate is the leading mobile commerce platform.

Shopgate offers everything online retailers need to be successful in mobile. Our leading
software-as-a-service (SaaS) enables online stores to easily create, maintain and optimize native
apps and mobile websites for the iPhone, iPad, Android smartphones and tablets.


## License

Shopgate Cloud - Extension Boilerplate is available under the Apache License, Version 2.0.

See the [LICENSE](./LICENSE) file for more information.


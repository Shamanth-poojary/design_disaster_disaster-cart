# Chaos Quick-Commerce Website
## Design Disaster Event – Round 1 (Chaos)

This document describes the **complete structure, concept, and implementation plan** for a quick-commerce website that is **intentionally designed badly**.

The objective is to deliberately **violate UX rules, accessibility guidelines, and web design standards** while implementing the chaos requirements of the event.

---

# Required Chaos Elements

The website must demonstrate the following flaws:

1. Hard-to-find product categories  
2. Confusing cart or checkout process  
3. Misleading delivery times  
4. Poor search or filtering system  

Additional chaos will be introduced through:

- dark patterns  
- poor accessibility  
- confusing navigation  
- bad color contrast  
- visual clutter  
- misleading pricing  

---

# Website Concept

### Website Name
FlashKart – 5 Minute Grocery

### Tagline
Groceries faster than logic.

The website mimics a quick-commerce grocery platform but intentionally creates a **frustrating user experience**.

---

# Website Sitemap

```
index.html
categories.html
search.html
product.html
cart.html
checkout.html
delivery.html
account.html
```

Each page demonstrates a **different UX failure**.

---

# Folder Structure

```
chaos-commerce/

index.html
categories.html
search.html
product.html
cart.html
checkout.html
delivery.html

css/
   chaos.css

js/
   search.js
   cart.js
   countdown.js

images/
   banner.gif
   random1.jpg
   random2.jpg

data/
   products.json
```

This structure keeps the project **easy to implement during a hackathon**.

---

# Global Layout

All pages share the same chaotic layout.

```
-------------------------------------------------
FLASHKART LOGO | rotating banner | login
-------------------------------------------------
tiny search bar | random icons | flashing offers
-------------------------------------------------
hidden sidebar categories
-------------------------------------------------
main content
-------------------------------------------------
floating popups
-------------------------------------------------
confusing footer
-------------------------------------------------
```

### UX Violations

- poor color contrast  
- flashing banners  
- moving UI elements  
- hidden navigation  
- tiny search bar  
- random popups  

---

# Homepage (index.html)

Purpose: create immediate chaos.

### Layout

```
Hero Banner (auto changing every second)

Popup: Sign up or miss the deal!

Scrolling delivery text:
Delivery in 3 mins! 8 mins! 2 mins! maybe!

Random product grid
```

### Chaos Elements

- flashing banners  
- misleading delivery promises  
- multiple popups  
- cluttered layout  
- hidden categories  

### Page Structure

```
header
   logo
   rotating banner

hero section
   slideshow

offers section
   flashing deals

product section
   random unsorted products
```

---

# Categories Page (categories.html)

Purpose: make categories difficult to find.

### Category List

```
Fresh
Things
Maybe Vegetables
Stuff
Liquid Items
Mystery
```

### Chaos Elements

- unclear category names  
- random grouping  
- no hierarchy  
- confusing icons  

Example

```
Vegetables inside "Things"
Milk inside "Stuff"
Bread inside "Mystery"
```

---

# Search Page (search.html)

Purpose: broken search experience.

### Layout

```
Search Results

Sort by
weirdness
price??
randomness

Filters
Blue items
Discount mood
Heavy items
```

### Chaos Elements

- irrelevant results  
- filters reset automatically  
- no typo correction  
- random sorting  

Example

Search: milk

Results

```
Tomato
Laptop stand
Chocolate
Water bottle
```

---

# Product Page (product.html)

Purpose: confusing product information.

### Layout

```
Huge product image

Price: ₹99

tax maybe

Delivery
2 minutes - 60 minutes

Description
large unformatted paragraph
```

### Chaos Elements

- hidden tax  
- vague delivery time  
- oversized images  
- add-to-cart button hidden below the page  

Structure

```
product image
price
delivery info
description
(add to cart button very far below)
```

---

# Cart Page (cart.html)

Purpose: confusing cart totals.

### Layout

```
Your Cart

Milk ₹50
Delivery ₹?
Handling ₹?
Packaging ₹?
Random Tip ₹?

Total ????
```

### Chaos Elements

- hidden fees  
- unclear totals  
- random discounts  
- items added automatically  

Example

User adds milk

Cart shows

```
Milk
Mesh Bag
Premium Packaging
Tip
```

---

# Checkout Page (checkout.html)

Purpose: maximum friction.

### Checkout Steps

```
Step 1 Create account
Step 2 Enter address
Step 3 Enter address again
Step 4 Enter OTP
Step 5 Enter loyalty number
Step 6 Confirm order
```

### Chaos Elements

- too many steps  
- repeated information  
- no progress indicator  
- confusing errors  

Example error

```
Error: something went wrong
```

(no explanation)

---

# Delivery Page (delivery.html)

Purpose: misleading delivery information.

### Layout

```
Delivery ETA

Arriving in 5 minutes

Countdown
5:00
4:59
4:58

Then resets to

10:00
```

### Chaos Elements

- fake countdown timer  
- changing ETA  
- contradictory delivery information  

---

# Visual Disaster Style Guide

### Colors

Use extreme clashing colors

```
lime green
neon pink
bright yellow
cyan
purple
```

Example CSS

```
background: #00ff00;
color: #ffff00;
button: #ff00ff;
```

---

### Typography

Use too many fonts

```
Comic Sans
Impact
Times New Roman
Courier
Papyrus
```

---

### Layout Problems

- no grid alignment  
- overlapping elements  
- random spacing  

---

# JavaScript Chaos Features

### Fake Delivery Timer

```
setInterval(() => {
  time += Math.random() * 5
},1000)
```

Timer randomly increases.

---

### Random Search Results

```
results = products.sort(() => Math.random() - 0.5)
```

---

### Sneak Item Into Cart

```
if(Math.random() > 0.7){
  cart.push("Premium Bag")
}
```

---

### Popup Spam

```
setTimeout(() => {
 alert("LIMITED OFFER")
},2000)
```

---

# Bonus Chaos Ideas

These features help impress judges.

### Moving Button
Add-to-cart button moves away when hovered.

### Sound Effects
Notification sound every few seconds.

### Auto Scrolling Page
Page scrolls automatically.

### Random Language Switch

```
Add to Cart
Añadir
Ajouter
```

### Fake Scarcity Warning

```
ONLY 1 LEFT
```

Refreshing the page shows the same warning again.

---

# Implementation Timeline

### Hour 1
Create pages

```
index
categories
search
product
cart
checkout
```

### Hour 2
Add CSS chaos  
colors  
fonts  
layout  

### Hour 3
Add JavaScript chaos  
fake timers  
random search  
popups  

### Hour 4
Add dark patterns  
hidden fees  
auto cart items  

---

# Expected Impact

This website intentionally demonstrates:

- dark UX patterns  
- accessibility violations  
- misleading ecommerce tactics  
- confusing navigation  
- broken search systems  
- fake delivery promises  

The project highlights **how poor design harms user experience**, which aligns perfectly with the **Design Disaster challenge**.

---

End of Document.
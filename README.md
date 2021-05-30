# Sinus-webshop-slutproject-backend
en BackEnd project till en webbshop med en färdig FrontEnd.

SINUS Webshop FrontEnd
SINUS Webshop är en onlinebutik som säljer skateboards och tillbehör.

Webshoppen ska ha 3 olika lägen

Anonym besökare
Inloggad Kund
Inloggad Admin
Anonym besökare
Anonyma besökare kan registrera sig och genomföra ordrar.

Inloggad Kund
Inloggade besökare kan genomföra ordrar och se sin kontoinformation.

Inloggad Admin
Administratörer har en extra view där hen kan administrera produkter.

API Specifikation
Resurs	Metod	Detaljer:

1)
- /api/auth/	POST	Authentiserar user med email & password. Returnerar en JWT-token som används vid varje anrop API:et i en Authorization-header.

2)
- /api/register/	POST	Registrerar en user enligt User-modellen.

3)
- /api/products/	GET	Returnerar en lista på samtliga produkter.

4)
- /api/products/:id	GET	Returnerar en enstaka produkt.

5)
- /api/products/	POST	Skapar en ny produkt, se produkt-modell. Enbart tillgänglig för admins

6)
- /api/products/:id	PATCH	Uppdaterar produkt, se produkt-modell. Enbart tillgänglig för admins

7)
- /api/products/:id	DELETE	Tar bort en produkt med :id. Enbart tillgänglig för admins

8)
- /api/orders	GET	Returnerar en lista på samtliga ordrar för admins, och ägda orders för inloggad användare.

9)
/api/orders	POST	Skapar en ny order, se order-modell.

## Datamodeller:

### Auth End-Point Response
    {

          token: "TJOSSAN",
          user: {
            email: "kdajsdaskj",
            name: "fkdjsofksj",
            role: "customer",
            adress: {
              street: "omg",
              zip: "shiet",
              city: "Smygehuk"
            }
          }

    }



### Product
     {
 
          _id: '39y7gbbZk1u4ABnv',
          title: 'Gretas Fury',
          price: 999,
          shortDesc: 'Unisex',
          longDesc: 'Skate ipsum dolor sit amet...',
          imgFile: 'skateboard-greta.png'

    } 


### Order
     {
          _id: 123,
          timeStamp: Date.now(), 
          status: 'inProcess',
          items: [ <productId1>, <productId2>, ... ],
          orderValue: 999
    } 
  

### User
     {
  
            _id: '6b521d3f-3d15...' // add server side
            email: 'johan.kivi@zocom.se',
            password: '$$$hashed password$$$',
            name: 'Johan Kivi',
            role: 'admin', // or customer

            adress: {
                street: 'Tokitokvägen 3',
                zip: '123 45',
                city: 'Tokberga'
            },
            orderHistory: [ orderId1, orderId2, ... ]

     } 
  
## Bedömning
G-krav
Git Flow
MVC
JWT och bcrypt
RBAC
Enhetstester och integrationstester för modeller och kontroller




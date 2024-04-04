const init = async () => {
  // 1. Se llama a la API con la siguiente URL https://buty619.github.io/pricing.json que traera
  // toda la información para luego inyectarla en el HTML realizando una petición GET para obtener dicha data.
  const url = "https://buty619.github.io/pricing.json";
  const jsonData = await fetch(url);
  const { basic, eco, pro, business } = await jsonData.json();

  // 2. Luego de obtener la información de los planes se inyectan los valores
  // en el html de cada card de los posibles planes a comprar.

  // 2.1 Primero se obtiene el elemento card del plan basic usando su clase.
  const basicCard = document.querySelector(".pricing-card.basic");

  // 2.1.1 Se selecciona el titulo y se inyecta el valor obtenido de la API.
  const basicCardTitle = basicCard.querySelector(".plan-title");
  basicCardTitle.innerHTML = basic.name;

  // 2.1.2 Se selecciona el precio y se inyecta el valor obtenido de la API en la tag span correspondiente.
  const basicCardPrice = basicCard.querySelector(".price-title");
  const basicCardPriceSpan = basicCardPrice.querySelector("span");
  basicCardPriceSpan.innerHTML = basic.price;

  // 2.1.3  Ahora se inyecta el valor del descuento de plan basic en el span que se encuentra dentro del elemento
  // con clase `badge-box`.
  const basicCardDiscount = basicCard.querySelector(".badge-box");
  const basicCardDiscountSpan = basicCardDiscount.querySelector("span");
  basicCardDiscountSpan.innerHTML = `Save ${basic.discount}`;

  // 2.1.4 Por ultimo se completa la informacion de las caracteristicas del plan
  //utilizando un array con los elementos li y recorriendolo con la función map para
  //cambiar el contenido de cada elemento li por la correspondiente caracteristica del plan.
  const basicCardList = basicCard.querySelector("ul");
  const basicCardElementList = basicCardList.querySelectorAll("li");
  [...basicCardElementList].map(
    (element, i) => (element.innerHTML = basic.characteristics[i])
  );

  // 2.2  Ahora utilizando nuevamente la funcion map se re utiliza el codigo inplementado
  // en la primera card para llenar la información del resto de cards
  // con cada uno de los planes correspondientes.
  const apiData = { basic, eco, pro, business };
  Object.entries(apiData).map(([section, data]) => {
    const card = document.querySelector(`.pricing-card.${section}`);
    const cardTitle = card.querySelector(".plan-title");
    cardTitle.innerHTML = data.name;
    const cardPrice = card.querySelector(".price-title");
    const cardPriceSpan = cardPrice.querySelector("span");
    cardPriceSpan.innerHTML = data.price;
    const cardDiscount = card.querySelector(".badge-box");
    const cardDiscountSpan = cardDiscount.querySelector("span");
    cardDiscountSpan.innerHTML = `Save ${data.discount}`;
    const cardList = card.querySelector("ul");
    const cardElementList = cardList.querySelectorAll("li");
    [...cardElementList].map(
      (element, i) => (element.innerHTML = data.characteristics[i])
    );
  });

  // 3. Por ultimo, se agrega una accion a los botones de cada card que nos dirije la pagina `/payment` que
  // envia como query params el nombre del plan y el precio.
  Object.entries(apiData).map(([section, data]) => {
    const card = document.querySelector(`.pricing-card.${section}`);
    const cardButton = card.querySelector(".buy-now");
    cardButton.href = `/payment.html?name=${data.name}&price=$${data.price}`;
  });
};

// Se inicializa el script

init();

const currency = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export const formatPrice = (value) => currency.format(Number(value) || 0);

module.exports = ({ manager }) => {
  manager.hooks.on(
    "shipping_option.calculate_total",
    async (shipping_option, cart) => {
      // Verifica se o total do carrinho é maior ou igual a 399
      if (cart.total >= 39900) {
        // 399 = 39900 cents
        // Se o total do carrinho for >= 399, define o custo do envio como zero
        shipping_option.amount = 0;
      }
      return shipping_option;
    }
  );
};

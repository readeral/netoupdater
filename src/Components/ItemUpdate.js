class ItemUpdate {
  constructor(skuVal, OrderAmount) {
    this.SKU = skuVal;
    this.WarehouseQuantity = [
      {
        WarehouseID: "1",
        Quantity: OrderAmount,
        Action: "increment"
      }
    ];
  }
}

export default ItemUpdate;

class ItemUpdate {
  constructor(skuVal, OrderAmount, Method) {
    this.SKU = skuVal;
    this.WarehouseQuantity = [
      {
        WarehouseID: "1",
        Quantity: OrderAmount,
        Action: Method,
        PreOrderQuantity: "",
        DateArrival: ""
      }
    ];
  }
}

export default ItemUpdate;

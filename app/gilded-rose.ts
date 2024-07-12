export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  isNormalItem(item) {
    return (
      item.name != 'Aged Brie' 
      && item.name != 'Backstage passes to a TAFKAL80ETC concert' 
      && item.name != 'Sulfuras, Hand of Ragnaros' 
      && item.quality >= 0
      && item.quality <= 50
    )
  }

  isBrie(item) {
    return (
      item.name == 'Aged Brie'
      && item.quality >= 0
      && item.quality < 50
    )
  }

  isBackstagePass(item) {
    return (
      item.name == 'Backstage passes to a TAFKAL80ETC concert'
      && item.quality >= 0
      && item.quality < 50
    )
  }

  isSulfuras(item) {
    return (
      item.name == 'Sulfuras, Hand of Ragnaros'
      && item.quality == 80
    )
  }

  updateQuality(item, amount) {
    if (item.quality + amount <= 50) {
      item.quality += amount;
    } else {
      item.quality = 50;
    }
  }

  updateSellIn(item) {
    item.sellIn -= 1
  }

  updateItem() {
    for (let i = 0; i < this.items.length; i++) {

      const item = this.items[i];

      // update sell by date every day for all items except Sulfuras
      if (!this.isSulfuras(item)) {
        this.updateSellIn(item)
      }

      // update quality for normal items
      if (this.isNormalItem(item)) {
        this.updateQuality(item, -1)
        if (item.sellIn < 0) {
          this.updateQuality(item, -1)
        }
      } 

      // update quality for Brie
      if (this.isBrie(item)) {
        this.updateQuality(item, +1)
        if (item.sellIn < 0) {
          this.updateQuality(item, +1)
        }
      }
      
      // update quality for Backstage Passes
      if (this.isBackstagePass(item)) {
        if (item.sellIn < 0) {
          this.updateQuality(item, (-1 * item.quality))
        }
        if (item.sellIn > 10) {
          this.updateQuality(item, +1)
        }
        if (item.sellIn > 5 && item.sellIn < 11) {
          this.updateQuality(item, +2)
        }
        if (item.sellIn >= 0 && item.sellIn < 6) {
          this.updateQuality(item, +3)
        }
      } 
    }
  
    return this.items;
  }
}

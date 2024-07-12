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

  isNormalItem(item: Item): boolean {
    return (
      item.name != 'Aged Brie' 
      && item.name != 'Backstage passes to a TAFKAL80ETC concert' 
      && item.name != 'Sulfuras, Hand of Ragnaros' 
      && item.quality >= 0
      && item.quality <= 50
    )
  }

  isBrie(item: Item): boolean {
    return (
      item.name == 'Aged Brie'
      && item.quality >= 0
      && item.quality < 50
    )
  }

  isBackstagePass(item: Item) {
    return (
      item.name == 'Backstage passes to a TAFKAL80ETC concert'
      && item.quality >= 0
      && item.quality < 50
    )
  }

  isSulfuras(item: Item) {
    return (
      item.name == 'Sulfuras, Hand of Ragnaros'
      && item.quality == 80
    )
  }

  updateQuality(item: Item, amount: number) {
    if (item.quality + amount <= 50) {
      item.quality += amount;
    } else {
      item.quality = 50;
    }
  }

  updateSellIn(item: Item) {
    item.sellIn -= 1
  }

  updateItem(): Array<Item> {
    for (let i = 0; i < this.items.length; i++) {

      const item: Item = this.items[i];

      // update quality for normal items
      if (this.isNormalItem(item)) {
        this.updateQuality(item, -1)
        this.updateSellIn(item)
        if (item.sellIn < 0) {
          this.updateQuality(item, -1)
        }
      } 

      // update quality for Brie
      if (this.isBrie(item)) {
        this.updateQuality(item, +1)
        this.updateSellIn(item)
        if (item.sellIn < 0) {
          this.updateQuality(item, +1)
        }
      }
      
      // update quality for Backstage Passes
      if (this.isBackstagePass(item)) {
        if (item.sellIn > 10) {
          this.updateQuality(item, +1)
        }
        if (item.sellIn > 5 && item.sellIn < 11) {
          this.updateQuality(item, +2)
        }
        if (item.sellIn >= 0 && item.sellIn < 6) {
          this.updateQuality(item, +3)
        }
        
        this.updateSellIn(item)

        if (item.sellIn < 0) {
          this.updateQuality(item, (-1 * item.quality))
        }
      } 
    }
    return this.items;
  }
}

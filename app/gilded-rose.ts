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

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      // console.log('before first if condition',this.items[i].name,this.items[i].sellIn,this.items[i].quality)
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].quality > 0 && this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        // is normal
        this.items[i].quality = this.items[i].quality - 1
        // is Brie or Backstage > 10
      } 
      else if (this.items[i].quality < 50 ) {
        this.items[i].quality = this.items[i].quality + 1
        // is Backstage < 11
        if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (this.items[i].sellIn < 11 && this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
          if (this.items[i].sellIn < 6 && this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      } // end of if

      //console.log('after first if condition',this.items[i].name,this.items[i].sellIn,this.items[i].quality)
      // is normal
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }

      //console.log('before sell-by if condition',this.items[i].name,this.items[i].sellIn,this.items[i].quality)
      // is past sell-by date
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert' && this.items[i].quality > 0 && this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
          // is normal
          this.items[i].quality = this.items[i].quality - 1

        // is Backstage
        } else if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
          // is Brie
        else if (this.items[i].name == 'Aged Brie' && this.items[i].quality < 50) {
          console.log(this.items[i].name,this.items[i].quality,this.items[i].sellIn)
          this.items[i].quality = this.items[i].quality + 1
        }
      } // end of the past sell-by date if condition
      //console.log('after sell-by if condition',this.items[i].name,this.items[i].sellIn,this.items[i].quality)
    } // end of loop 
  
    return this.items;
  }
}

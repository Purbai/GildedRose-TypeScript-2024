import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateItem();
    expect(items[0].name).toBe('foo');
  });

  it('should decrease quality by 1 for normal items', () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(19);
  });

  it('should increase quality by 1 for Brie if quality is < 50', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 0)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(1);
  });

  it('should not increase quality for Brie over 50', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 2, 50)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(50);
  });

  it('should increase quality by 1 for Backstage when SellIn days > 10', () => {
    const item = new Item("Backstage passes to a TAFKAL80ETC concert", 11, 20)
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(21);
    expect(items[0].sellIn).toBe(10);
  });

  it('should increase quality by 2 for Backstage when SellIn days are between 6 and 10', () => {
    const itemOne = new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20)
    const itemTwo = new Item("Backstage passes to a TAFKAL80ETC concert", 6, 20)
    const gildedRose = new GildedRose([itemOne, itemTwo]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(22);
    expect(items[0].sellIn).toBe(9);
    expect(items[1].quality).toBe(22);
    expect(items[1].sellIn).toBe(5);
  });

  it('should increase quality by 3 for Backstage when SellIn days < 6', () => {
    const itemOne = new Item("Backstage passes to a TAFKAL80ETC concert", 5, 20)
    const gildedRose = new GildedRose([itemOne]);
    const items = gildedRose.updateItem();

    expect(items[0].quality).toBe(23);
    expect(items[0].sellIn).toBe(4);
  });

  it.skip('should decrease quality to zero for Backstage when SellIn is 0', () => {
    const itemOne = new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)
    const gildedRose = new GildedRose([itemOne]);
    const items = gildedRose.updateItem();

    expect(items[1].quality).toBe(0);
    expect(items[1].sellIn).toBe(-1);
  });

  it('should increase quality by 1 for Backstage when SellIn days < 11 and > 5 and quality is 49', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(50);
  });

  it('should increase quality by 1 for Backstage when SellIn days < 6 and quality is 49', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });

  
  it('should reduce quality to zero  if selling days < 0 for Backstage', () => {
    const gildedRose = new GildedRose([new Item("Backstage passes to a TAFKAL80ETC concert", -1, 20)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-2);
  })


  it('decrease the selln days by 1', () => {
    const gildedRose = new GildedRose([new Item("someitem", 5, 49)]);
    const items = gildedRose.updateItem();
    expect(items[0].sellIn).toBe(4);
  });


  it('should not change the selln days if Sulfuras', () => {
    const gildedRose = new GildedRose([new Item("Sulfuras, Hand of Ragnaros", 0, 80)]);
    const items = gildedRose.updateItem();
    expect(items[0].sellIn).toBe(0);
  });

  it('should increase quality by 2 if selling days < 0 & quality < 50 for Brie', () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", -1, 20)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(22);
  })

  it('should reduce quality by 2  if selling days = 0 for normal', () => {
    const gildedRose = new GildedRose([new Item("someitem", 0, 20)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(18);
  })

  it('should reduce quality by 2  if selling days = 1 for normal', () => {
    const gildedRose = new GildedRose([new Item("someitem", 1, 20)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(19);
  })

  it('should reduce quality by 2  if selling days < 0 for normal', () => {
    const gildedRose = new GildedRose([new Item("someitem", -1, 20)]);
    const items = gildedRose.updateItem();
    expect(items[0].quality).toBe(18);
  })

});

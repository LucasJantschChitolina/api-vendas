import { EntityRepository, Repository } from 'typeorm';
import Product from '../entities/Products';

@EntityRepository(Product)
export class ProductsRepository extends Repository<Product> {
  public findByName(name: string): Promise<Product | undefined> {
    const product = this.findOne({
      where: {
        name
      }
    });
    return product;
  }
}

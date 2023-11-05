import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Product } from './entities/product.entity';

@Resolver('product')
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Query(() => [Product])
  async findAllProduct(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Query(() => Product)
  async findOneProduct(@Args('id') id: number): Promise<Product> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  async createProduct(
    @Args('createProduct') createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  
  @Mutation(() => Product)
  async updateProduct(
    @Args('id') id: number, 
    @Args('updateProduct') updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @Mutation(() => Number)
  async removeProduct(
    @Args('id', { type: () => ID}) id: number,
    ): Promise<number> {
    return this.productService.remove(id);
  }
}
